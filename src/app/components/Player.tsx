type PlayerProps = {
    songId: number;
    selectedSong: number;
    isPlaying: Boolean;
    isShowPlayer: Boolean;
    onClick: () => void;
};

export default function Player({ songId, selectedSong, isPlaying, isShowPlayer, onClick }: PlayerProps) {
    return (
        <div>
            {isShowPlayer &&
                <button onClick={onClick}>
                    {isPlaying && songId === selectedSong ? "Pause" : "Play"}
                </button>
            }
        </div>
    );
}