// AudioContext.js
import React, { createContext, useContext, useState } from "react";

const AudioContext = createContext(null);

export const useAudioContext = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [playingAudio, setPlayingAudio] = useState(null);

  const playAudio = (id) => {
    setPlayingAudio(id);
  };

  return (
    <AudioContext.Provider value={{ playingAudio, playAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
