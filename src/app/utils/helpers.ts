import { Song } from "@/app/lib/types/types";
// Generate the audio file path from the selected song name.
export function getSongSource(song: Song) {
    return `/songs/${song.name.toLowerCase().replaceAll(" ", "-")}.mp3`;
}

// Formate song currentTime and duration in minutes and seconds
export function getSongTimeFormat(time: number = 0): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const length = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    return length;
}

// Pick a random song from the 7 songs
export function getRandomSong(): number {
    return Math.floor(Math.random() * 7) + 1;
}