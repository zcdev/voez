import { type RefObject, useEffect, useRef, useState } from "react";

type UseSpeechToTextReturn = {
    transcript: string;
    isListening: boolean;
    recognitionRef: RefObject<SpeechRecognition | null>;
};

export function useSpeechToText(): UseSpeechToTextReturn {
    // Store the transcript, track whether speech recognition is listening,
    // and keep a reference to the recognition instance
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        // TypeScript guard for environments where the window object is unavailable
        if (typeof window === "undefined") return;

        // Get the browser's Speech Recognition constructor
        const SpeechRecognition =
            (window.SpeechRecognition ||
                window.webkitSpeechRecognition) as unknown as {
                    new(): SpeechRecognition;
                };
        if (typeof SpeechRecognition === "undefined") return;

        // Disable continuous listening and interim results
        const recognition = new SpeechRecognition();

        // Default to false so recognition is not always running
        recognition.continuous = false;
        recognition.interimResults = false;

        // Capture the final transcript
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let text = "";

            // Combine all recognized speech segments into a single string
            for (let i = event.resultIndex; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }

            // Store the transcript in state
            setTranscript(text);

        };

        // Update listening state when recognition starts and ends
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        // Store the recognition instance in the ref
        recognitionRef.current = recognition;
    }, []);

    return { transcript, isListening, recognitionRef };
}