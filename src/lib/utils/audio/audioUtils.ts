import { Audio } from 'expo-av';
import { MutableRefObject } from 'react';

type CurrentPlayer = {
  sound: Audio.Sound | null
  pauseSound: () => void
  isMountedComponent: MutableRefObject<boolean> | null
}

const currentPlayer: CurrentPlayer = {
  sound: null,
  isMountedComponent: null,
  pauseSound() {
  },
};

export const setCurrentPlayer = ({
  sound,
  pauseSound,
  isMountedComponent,
}: CurrentPlayer) => {
  if (currentPlayer.sound === sound) return;
  if (currentPlayer.isMountedComponent?.current) {
    currentPlayer.pauseSound();
  }
  currentPlayer.sound = sound;
  currentPlayer.pauseSound = pauseSound;
  currentPlayer.isMountedComponent = isMountedComponent;
};

export const cleanCurrentPlayer = () => {
  currentPlayer.sound = null;
  currentPlayer.pauseSound = () => {
  };
  currentPlayer.isMountedComponent = null;
};

export const stopAndCleanCurrentPlayer = () => {
  if (currentPlayer.isMountedComponent?.current) {
    currentPlayer.pauseSound();
  }
  cleanCurrentPlayer();
};
