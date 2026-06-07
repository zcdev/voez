import Image from "next/image";
import Player from "./Player";
import { Song } from "@/app/lib/types/types";

type SongProps = {
    song: Song;
    selectedSong: number;
    isPlaying: Boolean;
    onClick: () => void;
};

export default function SongItem({ song, selectedSong, isPlaying, onClick }: SongProps) {

    const imageFile = song.name.toLowerCase().replaceAll(' ', '-');

    return (
        <>
            <li>
                <div>
                    <Image
                        src={`/images/${imageFile}.png`}
                        width={250}
                        height={250}
                        alt={song.name}
                        loading="eager"
                    />
                </div>
                <div>
                    <p>{song.id + 1}. {song.name}</p>
                    <Player songId={song.id} selectedSong={selectedSong} isPlaying={isPlaying} onClick={onClick} />
                    <p></p>
                </div>
            </li>
        </>
    );
}