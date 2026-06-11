import Image from "next/image";
import Player from "./Player";
import { Song } from "@/app/lib/types/types";
import { getSongTimeFormat } from "../utils/helpers";

type SongProps = {
    song: Song;
    selectedSong: number;
    isPlaying: boolean;
    isShowPlayer: boolean;
    duration: number;
    currentTime: number;
    onClick: () => void;
};

export default function SongItem({ song, selectedSong, isPlaying, isShowPlayer, duration, currentTime, onClick }: SongProps) {

    const imageFile = song.name.toLowerCase().replaceAll(' ', '-');
    const songLength = getSongTimeFormat(duration).toString();
    const progress = getSongTimeFormat(currentTime).toString();

    return (
        <>
            <li className="lg:mr-6 rounded-xl shadow-lg">
                <div>
                    <Image
                        src={`/images/${imageFile}.png`}
                        width={165}
                        height={165}
                        alt={song.name}
                        loading="eager"
                        className="rounded-t-xl"
                    />
                </div>
                <div className="bg-gray-400 pl-[10px] pr-2 py-2 rounded-b-xl text-white text-left">
                    <p className="text-sm font-semibold">{song.id + 1}. {song.name}</p>
                    <p className="text-xs">{progress}/{songLength}</p>
                    <Player songId={song.id} selectedSong={selectedSong} isPlaying={isPlaying} isShowPlayer={isShowPlayer} onClick={onClick} />
                </div>
            </li>
        </>
    );
}