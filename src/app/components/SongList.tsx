import SongItem from "@/app/components/SongItem";
import { Song } from "@/app/lib/types/types";

type PlaylistProps = {
    playlist: Song[];
    selectedSong: number;
    isPlaying: Boolean;
    isShowPlayer: Boolean;
    handlePlay: (songId: number) => void;
};

export default function SongList({ playlist, selectedSong, isPlaying, isShowPlayer, handlePlay }: PlaylistProps) {

    return (
        <section>
            <ul>
                {playlist.map((song) => (

                    <SongItem
                        key={song.id}
                        song={song}
                        selectedSong={selectedSong}
                        isPlaying={isPlaying}
                        isShowPlayer={isShowPlayer}
                        onClick={() => handlePlay(song.id)} />
                ))}
            </ul>
        </section>
    );
}