# Voez AI 🎙️

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Icons](https://img.shields.io/badge/React%20Icons-Library-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)
![ElevenLabs API](https://img.shields.io/badge/ElevenLabs-API-black?style=for-the-badge&logo=elevenlabs)
![Web Speech API](https://img.shields.io/badge/Web%20Speech-API-blue?style=for-the-badge&logo=web-speech-api&logoColor=white)
![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-00E9A3?style=for-the-badge&logo=redis&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## Live Demo

An experimental voice-first music player that explores AI-assisted navigation through conversation rather than traditional graphical interfaces: [https://voez.ai](https://voez.ai)

## Overview

Voez AI explores whether music discovery and playback can feel more natural when voice becomes the primary method of interaction.

Instead of navigating menus, searching manually, or relying heavily on visual controls, users can simply speak with the AI to request songs, receive recommendations, and control playback through conversation.

The project combines speech recognition, AI reasoning, voice synthesis, and audio playback into a single voice-driven experience designed around listening rather than clicking.

### Users can:

* Request songs using natural voice prompts
* Interact with an AI-powered voice assistant
* Discover music through conversational recommendations
* Reduce reliance on traditional UI controls
* Enjoy a continuous interactive listening experience

### What I Explored

This project served as a hands-on exploration of:

* Frontend architecture and state management
* API route design and orchestration
* Integration of OpenAI, ElevenLabs, and Web Speech APIs
* Speech-to-text (STT) and text-to-speech (TTS) workflows
* Event-driven audio interactions
* Complex conditional rendering patterns
* Graceful fallback and failure handling

## Features

```
User Voice
    ↓
Web Speech API (STT)
    ↓
OpenAI
    ↓
ElevenLabs (TTS)
    ↓
Audio Playback UI
```

### Voice Recognition & Speech Synthesis

Uses the Web Speech API for speech recognition and a custom ElevenLabs voice for AI-generated spoken responses.

### AI Mood Analysis & Music Recommendations

OpenAI analyzes the user's voice prompts and conversational context to infer mood, intent, and listening preferences, enabling personalized song recommendations and more natural music discovery.

### Conversational Music Playback

Users can request music through natural language and receive spoken feedback while controlling playback through conversation.

### Event-Driven Audio Experience

Audio playback is coordinated through state-based and event-driven interactions to create a seamless listening experience.

### Adaptive Interface

The interface dynamically adjusts throughout the listening journey, minimizing unnecessary visual distractions and keeping the experience focused on audio.

### Graceful Failure Handling

When AI analysis or recommendations fail, the application falls back to predefined behavior to maintain continuity rather than exposing technical errors to users.

### Rate Limiting

Redis-backed rate limiting helps prevent abuse, excessive requests, and accidental spam.

### Browser Support

Voez AI is an experimental voice-first application and is currently optimized for the latest version of Google Chrome.

Apple Safari is supported but requires these setups:

* Enable Siri/Dictation on the device.
* Allow microphone access in Safari.
* Grant microphone permission when prompted.
* Refresh the page after changing permissions.

Support for other browsers has not been fully validated, and some features may not function as expected. Please ensure your microphone and speakers are enabled with proper settings for Google Chrome and Apple Safari.

## Tech Stack

### Frontend

* Next.js
* React
* React Icons
* TypeScript
* Tailwind CSS
* Web Speech API

### Backend / Infrastructure

* Next.js API Routes
* Redis / Upstash Redis
* OpenAI API
* ElevenLabs API

### Deployment

* Vercel

## Local Development

### 1. Clone the repository

```bash
git clone git@github.com:zcdev/voez.git
cd voez
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file.

Example:

```env
OPENAI_API_KEY=
ELEVENLABS_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### 4. Run development server

```bash
npm run dev
```

Open `http://localhost:3000`

## Verification Workflow

Before deployment:

```bash
npm run verify
```

This workflow helped catch deployment issues early by combining linting, type checking, and build verification.

## Deployment

The project is configured for deployment on Vercel.

```bash
npm run build
```

Production deployment includes:

* Environment variable validation
* Redis-backed rate limit protection
* Build verification checks
* Responsive preview support

## Challenges & Learnings

Key lessons from development included:

* Designing conversational flows that remain intuitive across multiple user paths
* Building reliable fallback behavior for AI-driven experiences
* Managing asynchronous workflows across multiple APIs
* Coordinating speech recognition, speech synthesis, and audio playback
* Keeping the interface simple while handling complex state transitions

## Future Improvements

Potential future enhancements include:

* Expanded conversational controls
* Playlist and queue management
* Personalized recommendations
* User accounts and listening history
* Additional voice customization options
* Improved browser compatibility
* Accessibility-focused voice interactions

## Portfolio Notes

This project demonstrates:

* Production-focused frontend engineering
* Multi-API integration
* Voice-first UX experimentation
* Type-safe development practices
* Event-driven application design
* Resilient error and fallback handling

## License

MIT
