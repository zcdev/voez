import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";

type PlayerProps = {
    songId: number;
    selectedSong: number;
    isPlaying: boolean;
    isShowPlayer: boolean;
    onClick: () => void;
};

export default function Player({ songId, selectedSong, isPlaying, isShowPlayer, onClick }: PlayerProps) {

    return (
        <div>
            {isShowPlayer &&
                <button type="button" onClick={onClick} className="py-2 w-[70px] h-[35px] flex cursor-pointer leading-[15px] text-[15px] font-bold">
                    {isPlaying && songId === selectedSong ? (
                        <>
                            Pause<IoPauseSharp className="ml-1 inline" />
                        </>
                    ) : (
                        <>
                            Play<IoPlaySharp className="ml-1 inline" />
                        </>
                    )}
                </button>
            }
        </div>
    );
}