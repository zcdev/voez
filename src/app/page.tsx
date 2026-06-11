
'use client';
import { useState, useEffect, useRef } from "react";
import { useSpeechToText } from "@/app/lib/hooks/useSpeechToText";
import { fetchVoez } from '@/app/utils/fetch-voez';
import { fetchAI } from '@/app/utils/fetch-ai';
import { listenOnce } from "./utils/listen-once";
import { playlist } from "@/app/lib/data/playlist";
import { promptAI } from "@/app/lib/data/prompt";
import SongList from "@/app/components/SongList";
import Image from "next/image";
import { getSongSource } from "./utils/helpers";
import Link from "next/link";

const VOEZ_MESSAGES = [
  "Hello, welcome to Voez AI. Which song would you like to play?",
  "I can pick a song for you. What mood do you prefer?",
  "Ok, the song is playing now."
];

export default function Home() {
  const { transcript, isListening, recognitionRef } = useSpeechToText();
  const [selectedSong, setSelectedSong] = useState<number>(1);
  const [moods, setMoods] = useState<string>('');
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowPlayer, setIsShowPlayer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [voez, setVoez] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playSong() {
    setIsPlaying(true);
    setIsShowPlayer(true);
  }

  function handlePlay(songId: number) {
    setSelectedSong(songId);
    setIsPlaying(prev => !prev);
  }

  async function handleClick() {
    setIsClicked(true);

    try {
      // Start the voice interaction by greeting the user before listening.
      await fetchVoez(
        VOEZ_MESSAGES[0]
      );
      setVoez(VOEZ_MESSAGES[0]);
      // First prompt window: wait for the user's song or mood selection.
      const userInput = await listenOnce(recognitionRef, 7000);

      // Normalize the spoken input into searchable keywords.
      const words = userInput.toLowerCase().split(/\s+/);

      // Try to match the user's words to a song keyword.
      const directMatch = playlist.find(song =>
        song.keywords.some(keyword =>
          words.includes(keyword)
        )
      );

      // Select the song immediately when a keyword match is found.
      if (directMatch) {
        setSelectedSong(directMatch.id);
      } else {
        // Fall back to mood-based recommendations when no direct song match exists.
        await fetchVoez(
          VOEZ_MESSAGES[1]
        );
        setVoez(VOEZ_MESSAGES[1]);

        // Second prompt window: collect context for mood analysis.
        const userMessage = await listenOnce(recognitionRef, 7000);

        if (userMessage.trim() !== "") {
          // Send the user's mood description to the AI for song selection.
          const messageToAI = promptAI + "User message: " + userMessage;

          const AIresponse = await fetchAI(messageToAI);
          // Convert the AI response into a playlist song number.
          const songNumber = Number(AIresponse?.reply?.trim());

          // Store the default or selected song to play.     
          if (isNaN(songNumber)) {
            setSelectedSong(1);
          } else {
            setSelectedSong(Number(songNumber));
          }
        }
      }
      // Confirm the selection before starting playback.
      await fetchVoez(
        VOEZ_MESSAGES[2]
      );
      setVoez(VOEZ_MESSAGES[2]);

      // Continue to playback after the voice flow completes.
      playSong();

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const songIndex = playlist[selectedSong];

    // Build a readable mood summary for display.
    const songMoods =
      songIndex.moods.join(", ")
        .replace(/,(?=[^,]*$)/, ", and")
        .replace(/^./, char => char.toUpperCase()) + ".";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMoods(songMoods);

    // Load the newly selected track.
    const currentSong = getSongSource(songIndex);
    audioRef.current = new Audio(currentSong);
    console.log("Loaded:", currentSong);

    // Set duration for each song
    playlist.forEach((song) => {
      console.log(song);
      if (durations[song.id]) return;
      const currentFile = getSongSource(song);
      const audio = new Audio(currentFile);

      audio.addEventListener("canplaythrough", () => {
        setDurations((prev) => ({
          ...prev,
          [song.id]: audio.duration,
        }));
      });
    });

  }, [selectedSong, durations]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Stop any currently loaded audio before switching tracks.
    audio.pause();

    // Keep audio playback synchronized with the isPlaying state.
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }

    // Set currentTime for the selected song
    const handleTimeUpdate = () => {
      setCurrentTime(prev => ({
        ...prev,
        [selectedSong]: audio.currentTime,
      }));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Stop playback when the selected song changes or the component unmounts.
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.pause();
    };

  }, [isPlaying, selectedSong]);

  return (
    <div className="p-6 md:m-4 md:p-0 lg:p-10 text-lg w-full md:w-auto">
      <header className="mb-7 flex flex-col md:flex-row">
        <div className="w-full md:w-[165px]">
          <Image src="/voez-logo-black.svg" width={150} height={150} alt="Voez logo" className="m-auto" loading="eager" onClick={() => window.location.reload()} />
        </div>
        <div className="pl-0 md:pl-6 pt-6 md:pt-0 text-gray-600 font-normal">
          <h1 className="font-heading text-2xl font-bold text-black pb-4">Discover an AI-powered interactive music listening experience.</h1>
          <p>Status: {isListening ? "Listening..." : "Idle"}</p>
          <p>Voez: {voez}</p>
          <p>You: {transcript}</p>
          <p>Current moods: {isPlaying ? moods : ""}</p>
          <p>Currently playing: {isPlaying ? playlist[selectedSong].name : ""}</p>
        </div>
      </header>
      <main className="justify-items-center md:justify-items-start text-center md:text-left">
        <button onClick={handleClick} className={`mb-12 px-7 py-4 font-bold text-white bg-black rounded-xl ${isClicked ? "hidden" : ""}`}>
          Click to start
        </button>
        <SongList
          selectedSong={selectedSong}
          playlist={playlist}
          isPlaying={isPlaying}
          isShowPlayer={isShowPlayer}
          durations={durations}
          currentTime={currentTime}
          handlePlay={handlePlay} />
      </main>
      <footer className="text-sm">
        <p className="pt-40">Please do not submit confidential or sensitive information to AI tools without appropriate authorization.
        </p>
        <p className="pt-4">
          © {new Date().getFullYear()} Voez AI
        </p>
      </footer>
    </div>
  );
}
