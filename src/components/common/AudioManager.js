import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const playSound = (soundName) => {
    if (isMuted) return;
    // 일단 console.log로 대체
    console.log(`Playing sound: ${soundName}`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(`Sound is ${!isMuted ? 'muted' : 'unmuted'}`);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
