// import React, { useState, useRef } from "react";
// import IconButton from "@mui/material/IconButton";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";

// const AudioPlayPauseCell = (params) => {
//   const [playing, setPlaying] = useState(false);
//   const audioRef = useRef(null);

//   const togglePlayPause = () => {
//     console.log("params", params.row);
//     const audio = audioRef.current;
//     if (audio) {
//       if (playing) {
//         audio.pause();
//       } else {
//         audio.play();
//       }
//       setPlaying(!playing);
//     }
//   };

//   return (
//     <>
//       <IconButton onClick={togglePlayPause}>
//         {playing ? <PauseIcon /> : <PlayArrowIcon />}
//       </IconButton>
//       <audio
//         ref={audioRef}
//         src={`https://wanitsch.ch/sdats-manager/audio/${params.row.filepath}.flac`}
//         onEnded={() => setPlaying(false)}
//         style={{ display: "none" }} // Hide the default audio player
//       />
//     </>
//   );
// };

// export default AudioPlayPauseCell;

import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useAudioContext } from "../../contexts/AudioContext";

// const AudioPlayPauseCell = (params) => {
//   // const [localPlaying, setLocalPlaying] = useState(false);
//   // const audioRef = useRef(null);
//   // const { playingAudio, playAudio } = useAudioContext();
//   const ownId = params.row._id; // Ensure each row has a unique id

//   // useEffect(() => {
//   //   const audio = audioRef.current;
//   //   if (playingAudio === ownId) {
//   //     if (audio) audio.play();
//   //   } else {
//   //     if (audio) audio.pause();
//   //   }
//   //   setLocalPlaying(playingAudio === ownId);
//   // }, [playingAudio, ownId]);

//   // const togglePlayPause = () => {
//   //   try {
//   //     if (localPlaying) {
//   //       playAudio(null); // Stop playing
//   //     } else {
//   //       playAudio(ownId); // Start playing this audio
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   const [play, setPlay] = useState(false);
//   const [src, setSrc] = useState(null);

//   const togglePlayPause = () => {
//     try {
//       if (play) {
//         setSrc(
//           `https://wanitsch.ch/sdats-manager/audio/${params.row.filepath}.flac`
//         ); // Stop playing
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   console.log("src", src);
//   console.log("play", play);
//   return (
//     <>
//       {/* <IconButton onClick={togglePlayPause}>
//         {localPlaying ? <PauseIcon /> : <PlayArrowIcon />}
//       </IconButton>
//       <audio
//         ref={audioRef}
//         src={`https://wanitsch.ch/sdats-manager/audio/${params.row.filepath}.flac`}
//         onEnded={() => playAudio(null)}
//         style={{ display: "none" }} // Hide the default audio player
//       /> */}

//       {!play ? (
//         <IconButton
//           onClick={() => {
//             setPlay(true);
//             togglePlayPause();
//             // setSrc(
//             //   `https://wanitsch.ch/sdats-manager/audio/${params.row.filepath}.flac`
//             // );
//           }}
//         >
//           <PlayArrowIcon />
//         </IconButton>
//       ) : (
//         <audio controls>
//           <source src={src} type="audio"></source>
//         </audio>
//       )}
//     </>
//   );
// };

function AudioPlayPauseCell(params) {
  // const { params } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const [src, setSrc] = useState("");

  const handlePlayClick = () => {
    // Set the source if it's not already set or if it's paused
    if (!src || !isPlaying) {
      setSrc(
        `https://wanitsch.ch/sdats-manager/audio/${params.row.filepath}.flac`
      );
    }
    togglePlayPause();
  };

  return (
    <>
      <IconButton onClick={handlePlayClick}>
        {!isPlaying && <PlayArrowIcon />}
      </IconButton>

      <audio
        controls
        src={src}
        autoPlay={isPlaying}
        onEnded={handleAudioEnded}
        style={{ verticalAlign: "middle" }} // Adjust the alignment as necessary
      >
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default AudioPlayPauseCell;
