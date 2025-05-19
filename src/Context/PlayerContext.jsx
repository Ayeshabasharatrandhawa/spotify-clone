import { createContext, useState, useRef, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 }
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async(id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    const seekBarWidth = seekBg.current.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    const newTime = (offsetX / seekBarWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;

      seekBar.current.style.width = (current / total) * 100 + '%';

      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60)
        },
        totalTime: {
          second: Math.floor(total % 60),
          minute: Math.floor(total / 60)
        }
      });
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = handleTimeUpdate;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    next,
    previous,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
