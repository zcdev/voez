export async function fetchVoez(message: string) {
    try {
        // Send the message to the TTS API route
        const response = await fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        // console.log("response", response);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        // Convert the response into an audio source and create an audio instance
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        // Play the generated audio and resolve when playback completes
        return new Promise<void>((resolve, reject) => {
            audio.onended = () => resolve();
            audio.onerror = () => reject(new Error("Audio playback failed"));
            audio.play().catch();
        });

    } catch (error) {
        // Log any TTS request or playback errors
    }
}
