import { Audio } from 'expo-av';

export type AudioPlayBack = {
  isLoaded: true
  androidImplementation?: string

  uri: string

  progressUpdateIntervalMillis: number
  durationMillis?: number
  positionMillis: number
  playableDurationMillis?: number
  seekMillisToleranceBefore?: number
  seekMillisToleranceAfter?: number

  shouldPlay: boolean
  isPlaying: boolean
  isBuffering: boolean

  rate: number
  shouldCorrectPitch: boolean
  volume: number
  isMuted: boolean
  isLooping: boolean

  didJustFinish: boolean // true exactly once when the track plays to finish
  error?: string
}
export type SoundReturn = {
  sound: Audio.Sound
  status: AudioPlayBack
}
