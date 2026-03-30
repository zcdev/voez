"use client";

import { useState } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: "user", content: input },
        ];

        setMessages(newMessages);
        setInput("");
        setLoading(true);

        const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ messages: newMessages }),
        });

        const data = await res.json();

        setMessages([
            ...newMessages,
            {
                role: "assistant",
                content: data.reply.content,
            },
        ]);

        setLoading(false);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="space-y-2 mb-4">
                {messages.map((msg, i) => (
                    <div key={i}>
                        <b>{msg.role}:</b> {msg.content}
                    </div>
                ))}
                {loading && <div>Thinking...</div>}
            </div>

            <div className="flex gap-2">
                <input
                    className="border p-2 flex-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={sendMessage}
                    className="bg-black text-white px-4"
                >
                    Send
                </button>
            </div>
        </div>
    );
}