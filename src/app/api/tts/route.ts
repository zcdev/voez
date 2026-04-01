import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return new Response('Missing message', { status: 400 });
        }

        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            return new Response('Missing API key', { status: 500 });
        }

        const elevenlabs = new ElevenLabsClient({ apiKey });

        const audioStream = await elevenlabs.textToSpeech.stream(
            'E4Cyr0SWlDczsHZfWpRj',
            {
                text: message,
                modelId: 'eleven_v3',
                outputFormat: 'mp3_44100_128',
            }
        ) as ReadableStream<Uint8Array>;

        return new Response(audioStream, {
            headers: { 'Content-Type': 'audio/mpeg' },
        });

    } catch (error) {
        console.error(error);
        return new Response('Server error', { status: 500 });
    }
}