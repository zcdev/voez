import Image from "next/image";
import Player from "./Player";
import { Song } from "@/app/lib/types/types";

type SongProps = {
    song: Song;
    selectedSong: number;
    isPlaying: Boolean;
    isShowPlayer: Boolean;
    onClick: () => void;
};

export default function SongItem({ song, selectedSong, isPlaying, isShowPlayer, onClick }: SongProps) {

    const imageFile = song.name.toLowerCase().replaceAll(' ', '-');

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
                <div className="bg-gray-400 py-2 rounded-b-xl">
                    <p className="text-[14px] text-center text-white font-semibold">{song.id + 1}. {song.name}</p>
                    <Player songId={song.id} selectedSong={selectedSong} isPlaying={isPlaying} isShowPlayer={isShowPlayer} onClick={onClick} />
                    <p></p>
                </div>
            </li>
        </>
    );
}