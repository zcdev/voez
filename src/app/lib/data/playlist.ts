import { Song } from "@/app/lib/types/types";

export const playlist: Song[] = [
    {
        "id": 0, // For the order on the playlist
        "name": "Light Year", // For soundtrack & image
        "moods": ["epic", "empowering", "marvelous"], // Red
    },
    {
        "id": 1,
        "name": "Raindrops",
        "moods": ["joyful", "happy", "playful"], // Orange
    },
    {
        "id": 2,
        "name": "Kaleidoscope",
        "moods": ["hopeful", "optimistic", "uplifting"], // Yellow
    },
    {
        "id": 3,
        "name": "Over the River",
        "moods": ["content", "serene", "peaceful"], // Green
    },
    {
        "id": 4,
        "name": "Farewell Symphony",
        "moods": ["melancholy", "longing", "sorrowful"], // Blue
    },
    {
        "id": 5,
        "name": "Passage of Time",
        "moods": ["reflective", "nostalgic", "resilient"], // Navy
    },
    {
        "id": 6,
        "name": "Labyrinth",
        "moods": ["romantic", "dreamy", "enchanting"], // Purple
    },
] as const;