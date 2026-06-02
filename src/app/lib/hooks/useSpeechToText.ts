import { useEffect, useRef, useState } from "react";

type UseSpeechToTextReturn = {
    transcript: string;
    isListening: boolean;
    start: () => void;
    stop: () => void;
};

export function useSpeechToText(): UseSpeechToTextReturn {
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const SpeechRecognition =
            (window.SpeechRecognition ||
                window.webkitSpeechRecognition) as unknown as {
                    new(): SpeechRecognition;
                };
        if (typeof SpeechRecognition === "undefined") return;

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let text = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }

            setTranscript(text);

        };

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
    }, []);

    const start = () => {
        recognitionRef.current?.start();
    };

    const stop = () => {
        recognitionRef.current?.stop();
    };

    return { transcript, isListening, start, stop };
}