import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const AudioPlayPauseCell = (params) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <>
      <IconButton onClick={togglePlayPause}>
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <audio
        ref={audioRef}
        src={`https://wanitsch.ch/sdats-manager/audio/${params.row.filepath}.flac`}
        onEnded={() => setPlaying(false)}
        style={{ display: "none" }} // Hide the default audio player
      />
    </>
  );
};

export default AudioPlayPauseCell;
