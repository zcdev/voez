export default async function fetchVoez(message: string) {

    try {
        // Send request to TTS API route
        const response = await fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.body) throw new Error('No stream');

        if (response.ok) {
            // Create reader to consume stream chunks
            const reader = response.body.getReader();

            // Get MediaSource for audio stream in advance
            const mediaSource = new MediaSource();
            const audio = new Audio();
            audio.src = URL.createObjectURL(mediaSource);

            audio.play()
                .then(() => console.log("Voez is speaking."))
                .catch(error => console.error("Playback error:", error));

            // Wait until MediaSource is ready
            mediaSource.addEventListener('sourceopen', async () => {
                const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');

                // Read stream chunk-by-chunk
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        mediaSource.endOfStream();
                        break;
                    }

                    // Push chunk into buffer
                    sourceBuffer.appendBuffer(value);

                    // Wait until buffer finishes processing
                    await new Promise((resolve) => {
                        sourceBuffer.addEventListener('updateend', resolve, { once: true });
                    });
                }

                // Start playback AFTER buffer begins filling
                audio.play()
                    .then(() => console.log("Voez is speaking."))
                    .catch(err => console.error("Playback error:", err));
            });
        }

    } catch (error) {
        console.error("Request failed:", error);
    }
}
