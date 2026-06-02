
'use client';
import { useState, useEffect } from "react";
import { useSpeechToText } from "@/app/lib/hooks/useSpeechToText";
import fetchVoez from '@/app/utils/fetch-voez';
import fetchAI from '@/app/utils/fetch-ai';

export default function Home() {
  const [aiSays, setAISays] = useState<string>('');

  const { transcript, isListening, start, stop } = useSpeechToText();

  function handleClick() {
    fetchVoez("Hello! Welcome to Voez AI.");
  }

  async function handleStart() {
    start();
    console.log("starting...");
  }

  function handleStop() {
    stop();
    console.log("stop.");
  }

  useEffect(() => {
    if (isListening || !transcript.trim()) return;

    let ignore = false;

    const fetchMessage = async () => {
      const data = await fetchAI(transcript);

      console.log(data);

      if (!ignore && data?.reply?.content) {
        setAISays(data.reply.content);
      }
    };

    const timer = setTimeout(() => {
      fetchMessage();
    }, 2000);

    return () => clearTimeout(timer);

  }, [isListening, transcript]);

  return (
    <div className="p-10">
      <p>Transcription: {transcript}</p>
      <p>{aiSays}</p>
      <button onClick={handleClick} className="p-10 font-bold">
        Voez
      </button>
      <button onClick={handleStart} className="p-10 font-bold">
        Start
      </button>
      <button onClick={handleStop} className="p-10 font-bold">
        Stop
      </button>
    </div>
  );
}
