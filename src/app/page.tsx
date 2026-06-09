
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

const VOEZ_MESSAGES = [
  "Hello, welcome to Voez AI. Which song would you like to play?",
  "I can pick a song for you. What mood do you prefer?",
  "Ok, I'll play a song for you."
];
const testMessage = ["What song?", "What mood?", "Ok"];

export default function Home() {
  const { transcript, isListening, recognitionRef } = useSpeechToText();
  const [selectedSong, setSelectedSong] = useState<number>(1);
  const [moods, setMoods] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowPlayer, setIsShowPlayer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [voez, setVoez] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playSong() {
    setIsPlaying(true);
    setIsShowPlayer(true);
  }

  function pauseSong() {
    setIsPlaying(false);
  }

  function handlePlay(songId: number) {
    setSelectedSong(songId);
    isPlaying
      ? pauseSong()
      : playSong();
  }

  async function handleClick() {
    setIsClicked(true);

    try {
      // Start the voice interaction by greeting the user before listening.
      await fetchVoez(
        testMessage[0]
      );
      setVoez(testMessage[0]);
      // First prompt window: wait for the user's song or mood selection.
      const userInput = await listenOnce(recognitionRef, 5000);

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
        console.log("directMatch", directMatch);
        console.log("selectedSong", selectedSong);
      } else {
        // Fall back to mood-based recommendations when no direct song match exists.
        await fetchVoez(
          testMessage[1]
        );
        setVoez(testMessage[1]);

        // Second prompt window: collect context for mood analysis.
        const userMessage = await listenOnce(recognitionRef, 5000);

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

          console.log("AIresponse", AIresponse);
          console.log("songNumber", songNumber);
        }
      }
      // Confirm the selection before starting playback.
      await fetchVoez(
        testMessage[2]
      );
      setVoez(testMessage[2]);

      // Continue to playback after the voice flow completes.
      playSong();

    } catch (error) {
      console.error(error);
    }
  }

  /* Debug use to check state variables */
  console.log("selectedSong", selectedSong);
  console.log("isPlaying", isPlaying);
  console.log("isListening", isListening);
  console.log("isShowPlayer", isShowPlayer);

  useEffect(() => {
    const song = playlist[selectedSong];

    // Build a readable mood summary for display.
    const songMoods =
      song.moods.join(", ")
        .replace(/,(?=[^,]*$)/, ", and")
        .replace(/^./, char => char.toUpperCase()) + ".";

    setMoods(songMoods);

    // Generate the audio file path from the selected song name.
    const source =
      `/songs/${song.name
        .toLowerCase()
        .replaceAll(' ', '-')}.mp3`;

    // Stop any currently loaded audio before switching tracks.
    audioRef.current?.pause();

    // Load the newly selected track.
    audioRef.current = new Audio(source);

    console.log("Loaded:", source);

    // Stop playback when the selected song changes or the component unmounts.
    return () => {
      audioRef.current?.pause();
    };

  }, [selectedSong]);

  useEffect(() => {
    if (!audioRef.current) return;

    // Keep audio playback synchronized with the isPlaying state.
    isPlaying
      ? audioRef.current.play().catch(console.error)
      : audioRef.current.pause();

  }, [isPlaying]);

  return (
    <div className="p-6 md:m-4 md:p-0 lg:p-10 text-lg w-full md:w-auto">
      <div className="mb-7 flex flex-col md:flex-row">
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
      </div>
      <div className="justify-items-center md:justify-items-start text-center md:text-left">
        <button onClick={handleClick} className={`mb-12 px-7 py-4 font-bold text-white bg-black rounded-xl ${isClicked ? "hidden" : ""}`}>
          Click to start
        </button>
        <SongList
          selectedSong={selectedSong}
          playlist={playlist}
          isPlaying={isPlaying}
          isShowPlayer={isShowPlayer}
          handlePlay={handlePlay} />
      </div>
    </div>
  );
}
