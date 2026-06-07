type PlayerProps = {
    songId: number;
    selectedSong: number;
    isPlaying: Boolean;
    onClick: () => void;
};

export default function Player({ songId, selectedSong, isPlaying, onClick }: PlayerProps) {
    return (
        <div>
            <button onClick={onClick}>
                {isPlaying && songId === selectedSong ? "Pause" : "Play"}
            </button>
        </div>
    );
}