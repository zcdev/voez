// app/api/tts/route.ts

import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export async function POST(request: Request) {
    // Parse incoming JSON body
    const { message } = await request.json();

    // Validate input early
    if (!message) {
        return new Response('Missing message', { status: 400 });
    }

    // Ensure API key exists (fail fast)
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
        throw new Error('Missing ELEVENLABS_API_KEY');
    }

    // Initialize ElevenLabs client
    const elevenlabs = new ElevenLabsClient({ apiKey });

    // Request streaming audio response
    const audioStream = await elevenlabs.textToSpeech.stream(
        'E4Cyr0SWlDczsHZfWpRj',
        {
            text: message,
            modelId: 'eleven_v3',
            outputFormat: 'mp3_44100_128',
        }
    ) as ReadableStream<Uint8Array>;

    // Return stream directly to client
    return new Response(audioStream, {
        headers: {
            'Content-Type': 'audio/mpeg',
        },
    });
}

