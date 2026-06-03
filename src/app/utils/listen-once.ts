import { type RefObject } from "react";

export function listenOnce(
    recognitionRef: RefObject<SpeechRecognition | null>,
    timeoutMs = 5000
): Promise<string> {
    return new Promise((resolve) => {
        const recognition = recognitionRef.current;

        // TypeScript guard to ensure the recognition instance exists.
        if (!recognition) {
            return;
        }

        // Store the most recent transcript, initialized as an empty string.
        let finalText = "";

        // Capture the latest speech recognition result.
        const handleResult = (event: SpeechRecognitionEvent) => {
            finalText = event.results[event.results.length - 1][0].transcript;
        };

        // Stop speech recognition after the timeout period.
        const timeout = setTimeout(() => {
            recognition.stop();
            // console.log("Resolving...Timeout");
        }, timeoutMs);

        // Resolve the promise when recognition ends, then clean up listeners and timeout.
        const handleEnd = () => {
            cleanup();
            clearTimeout(timeout);
            resolve(finalText);
            // console.log("Resolving...End");
        };

        // Remove attached speech recognition event listeners.
        const cleanup = () => {
            recognition.removeEventListener("result", handleResult);
            recognition.removeEventListener("end", handleEnd);
        };

        // Attach speech recognition event listeners.
        recognition.addEventListener("result", handleResult);
        recognition.addEventListener("end", handleEnd);

        // Start speech recognition.
        recognition.start();
        // console.log("Starting...");

    });
}
