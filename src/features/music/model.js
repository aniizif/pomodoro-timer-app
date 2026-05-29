import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const SOUNDS = {
  track1: {
    name: 'Трек 1',
    file: require('../../../assets/music/akusticheskiy-kod-znaniy-1-905cb9.mp3'),
  },
  track2: {
    name: 'Трек 2',
    file: require('../../../assets/music/atmosfera-produktivnosti-2-485a29.mp3'),
  },
  track3: {
    name: 'Трек 3',
    file: require('../../../assets/music/atmosfera-uchebnogo-protsessa-1-bea8e3.mp3'),
  },
};

export const useMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSoundName, setCurrentSoundName] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const soundRef = useRef(null);

  const playSound = async (soundName) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const soundData = SOUNDS[soundName];
      if (!soundData) {
        throw new Error('Sound not found');
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        soundData.file,
        {
          shouldPlay: true,
          isLooping: true,
          volume: volume,
        }
      );

      soundRef.current = newSound;
      setIsPlaying(true);
      setCurrentSoundName(soundName);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const togglePlayback = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const stopMusic = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setIsPlaying(false);
      setCurrentSoundName(null);
    }
  };

  const changeVolume = async (newVolume) => {
    setVolume(newVolume);
    if (soundRef.current) {
      await soundRef.current.setVolumeAsync(newVolume);
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return {
    isPlaying,
    currentSoundName,
    volume,
    playSound,
    togglePlayback,
    stopMusic,
    changeVolume,
  };
};