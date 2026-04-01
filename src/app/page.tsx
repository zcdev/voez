'use client';

import fetchVoez from '@/app/utils/fetch-voez';

export default function Home() {

  function handleClick() {
    fetchVoez("Hello! Welcome to Voez AI.");
  }

  return (
    <div className="p-10">
      <button onClick={handleClick}>
        Speak
      </button>
    </div>
  );
}