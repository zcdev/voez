import SongItem from "@/app/components/SongItem";
import { Song } from "@/app/lib/types/types";
import { motion } from 'framer-motion';

type PlaylistProps = {
    playlist: Song[];
    selectedSong: number;
    isPlaying: boolean;
    isShowPlayer: boolean;
    durations: Record<string, number>;
    currentTime: Record<string, number>;
    handlePlay: (songId: number) => void;
};

export default function SongList({ playlist, selectedSong, isPlaying, isShowPlayer, durations, currentTime, handlePlay }: PlaylistProps) {

    return (
        <section>
            <ul>
                <motion.div
                    className="grid gap-6 lg:gap-2 grid-cols-[165px] md:grid-cols-4 lg:grid-cols-7"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.2 } },
                    }}
                >
                    {playlist.map((song) => (
                        <motion.div key={song.id} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                            <SongItem
                                song={song}
                                selectedSong={selectedSong}
                                isPlaying={isPlaying}
                                isShowPlayer={isShowPlayer}
                                duration={durations[song.id]}
                                currentTime={currentTime[song.id]}
                                onClick={() => handlePlay(song.id)} />
                        </motion.div>
                    ))}
                </motion.div>
            </ul>
        </section>
    );
}