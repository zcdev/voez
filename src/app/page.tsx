
'use client';
import { useState, useEffect, useRef } from "react";
import { useSpeechToText } from "@/app/lib/hooks/useSpeechToText";
import { fetchVoez } from '@/app/utils/fetch-voez';
import { fetchAI } from '@/app/utils/fetch-ai';
import { listenOnce } from "./utils/listen-once";
import { playlist } from "@/app/lib/data/playlist";
import SongList from "@/app/components/SongList";

export default function Home() {
  const [mood, setMood] = useState<string>('');
  const { transcript, isListening, recognitionRef } = useSpeechToText();
  const [selectedSong, setSelectedSong] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playSong() {
    setIsPlaying(true);
  }

  function pauseSong() {
    setIsPlaying(false);
  }

  function handlePlay(songId: number) {
    console.log("songId", songId);
    console.log("selectedSong", selectedSong);
    setSelectedSong(songId);
    isPlaying ? playSong() : pauseSong();
  }

  async function handleClick() {
    try {
      // Start the voice interaction by greeting the user before listening.
      await fetchVoez(
        "Hello, welcome to Voez AI. Which song would you like to play?"
      );

      // First prompt window: wait for the user's song or mood selection.
      const currentMood = await listenOnce(recognitionRef, 5000);

      if (currentMood.trim() === "") {
        // If nothing is heard, offer to pick a song from the user's mood.
        await fetchVoez(
          "I can pick a song for you. What mood do you prefer?"
        );

        // sort out what user said in the transcript

        // Second prompt window: collect context for mood analysis.
        const userMessage = await listenOnce(recognitionRef, 5000);

        if (userMessage.trim() !== "") {
          // Ask AI to infer the user's mood from the follow-up response.
          const messageToAI = ``;

          const data = await fetchAI(messageToAI);

          // Store the analyzed mood so the UI and song selection can use it.
          if (data?.reply?.content) setMood(data.reply.content);
          setSelectedSong(prev => 2);
        } else {
          setSelectedSong(prev => 2);
        }
      }

      console.log("Finished.");
      console.log("currentMood", currentMood);

      await fetchVoez(
        "Ok, I'll play a song for you."
      );

      // Continue to playback after the voice flow completes.
      playSong();

    } catch (error) {
      console.error(error);
    }
  }

  console.log("selectedSong", selectedSong);
  console.log("isPlaying", isPlaying);
  console.log("isListening", isListening);

  useEffect(() => {
    const source =
      `/songs/${playlist[selectedSong].name
        .toLowerCase()
        .replaceAll(' ', '-')}.mp3`;

    audioRef.current?.pause();
    audioRef.current = new Audio(source);

    console.log("Loaded:", source);

    return () => {
      audioRef.current?.pause();
    };
  }, [selectedSong]);


  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="p-10">
      <p>Status: {isListening ? "🎤 Listening..." : "Idle"}</p>
      <p>Transcription: {transcript}</p>
      <p>Current Mood: {mood}</p>
      <button onClick={handleClick} className="p-10 font-bold">
        Start
      </button>
      <SongList
        selectedSong={selectedSong}
        playlist={playlist}
        isPlaying={isPlaying}
        handlePlay={handlePlay} />
    </div>
  );
}
