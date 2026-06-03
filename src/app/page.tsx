
'use client';
import { useState } from "react";
import { useSpeechToText } from "@/app/lib/hooks/useSpeechToText";
import { fetchVoez } from '@/app/utils/fetch-voez';
import { fetchAI } from '@/app/utils/fetch-ai';
import { listenOnce } from "./utils/listen-once";

export default function Home() {
  const [mood, setMood] = useState<string>('');

  const { transcript, isListening, recognitionRef } = useSpeechToText();

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
      } else {
        // Second prompt window: collect context for mood analysis.
        const messageToAI = await listenOnce(recognitionRef, 5000);

        if (messageToAI.trim() !== "") {
          // Ask AI to infer the user's mood from the follow-up response.
          const data = await fetchAI(messageToAI);

          // Store the analyzed mood so the UI and song selection can use it.
          if (data?.reply?.content) setMood(data.reply.content);
        }
      }

      /* For debug use
      console.log("Finished.");
      console.log("currentMood", currentMood);
      */

      await fetchVoez(
        "Ok, I'll play a song for you."
      );
      // Continue to playback after the voice flow completes.
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="p-10">
      <p>Transcription: {transcript}</p>
      <p>Current Mood: {mood}</p>
      <button onClick={handleClick} className="p-10 font-bold">
        Start
      </button>
      <p>Status: {isListening ? "🎤 Listening..." : "Idle"}</p>
    </div>
  );
}
