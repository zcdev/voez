'use client';
import { useState, useEffect } from 'react';
import Chat from '@/app/components/Chat';
import fetchVoez from '@/app/utils/fetch-voez';

const voezMessages =
{
  "intro": "Hello! Welcome to Voez AI. I’d love to have a quick conversation with you to help others better understand experiences with AI and voice technology. This will only take a minute, and your response will not be recorded. To start, could you briefly share any experience you’ve had with an AI chatbot?",
  "interm": "Thanks, your input helps us improve how people interact with AI. What do you think about your experience with AI technologies in general?",
  "ending": "Thanks so much for sharing your thoughts with me. Your input really helps us improve how people experience AI. Wishing you a great rest of your day!"
};

export default function Home() {

  const [message, setMessage] = useState<string>("");

  console.log("home", message);

  useEffect(() => {

    setMessage(voezMessages.intro);

    fetchVoez(message);

  }, []);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Chat />
      </main>
    </div>
  );
}