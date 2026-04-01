// lib/voez-conversation.ts

export const voezConversation = [{
    "intro": {
        "text": "Hello! Welcome to Voez AI. I'd love to have a quick conversation with you to help others better understand experiences with AI and voice technology. This will only take a minute, and your response will not be recorded. To start, could you briefly share any experience you've had with an AI chatbot?",
        "next": "interm"
    },
    "mid": {
        "text": "Thanks, your input helps us improve how people interact with AI. What do you think about your experience with AI technologies in general?",
        "next": "ending",
    },
    "ending": {
        "text": "Thanks so much for sharing your thoughts with me. Your input really helps us improve how people experience AI. Wishing you a great rest of your day!",
        "next": null,
    }
}];