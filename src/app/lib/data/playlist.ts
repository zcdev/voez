import { Song } from "@/app/lib/types/types";

export const playlist: Song[] = [
    {
        "id": 0, // For the order on the playlist
        "name": "Light Year", // For soundtrack & image
        "moods": ["energetic", "awesome", "exciting"], // Red
        "keywords": ["first", "one", "red"],
    },
    {
        "id": 1,
        "name": "Raindrops",
        "moods": ["joyful", "happy", "playful"], // Orange
        "keywords": ["second", "two", "orange"],
    },
    {
        "id": 2,
        "name": "Kaleidoscope",
        "moods": ["hopeful", "optimistic", "uplifting"], // Yellow
        "keywords": ["third", "three", "orange"],
    },
    {
        "id": 3,
        "name": "Over the River",
        "moods": ["content", "serene", "peaceful"], // Green
        "keywords": ["forth", "four", "green"],
    },
    {
        "id": 4,
        "name": "Farewell Symphony",
        "moods": ["melancholy", "heartbroken", "sorrowful"], // Blue
        "keywords": ["fifth", "five", "blue"],
    },
    {
        "id": 5,
        "name": "Passage of Time",
        "moods": ["reflective", "nostalgic", "resilient"], // Navy
        "keywords": ["sixth", "six", "navy"],
    },
    {
        "id": 6,
        "name": "Labyrinth",
        "moods": ["romantic", "dreamy", "enchanting"], // Purple
        "keywords": ["seventh", "seven", "purple"],
    },
] as const;