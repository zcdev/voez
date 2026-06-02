export default async function fetchVoez(message: string) {
    try {
        const response = await fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        console.log("response", response);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        await audio.play();

    } catch (error) {
        console.error('TTS error:', error);
    }
}