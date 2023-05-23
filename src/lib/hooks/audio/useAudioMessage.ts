import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Audio, AVPlaybackStatus } from 'expo-av';
import { ProgressIndicatorController } from '../../../components/progress-indicator/LocalProgressIndicator';
import { AudioPlayBack, SoundReturn } from '../../types/audio/audioTypes';
import { cleanCurrentPlayer, setCurrentPlayer } from '../../utils/audio/audioUtils';

const createSound = async (
    uri: string,
    onPlay: (status: AudioPlayBack) => void,
) => {
  try {
    const { sound, status } = (await Audio.Sound.createAsync(
        { uri },
        { progressUpdateIntervalMillis: 100 },
      onPlay as (playbackStatus: AVPlaybackStatus) => void,
    )) as SoundReturn;
    if (status.error) return null;
    return { sound, status };
  } catch (e) {
    console.log('createSound: ', e);
    return null;
  }
};

type UseAudioMessage = {
  uri: string
  progressController: MutableRefObject<ProgressIndicatorController>
}

export const useAudioMessage = ({ uri, progressController }: UseAudioMessage) => {
  const record = useRef<SoundReturn | null>(null);
  const isMounted = useRef(true);
  const soundIsPlaying = useRef(false);
  const [isOnPlay, setOnPlay] = useState(false);
  const [waitingForLoad, setWaitingForLoad] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [duration, setDuration] = useState(0);

  const pause = useCallback(() => {
    if (!record.current) return;
    record.current.sound
        .pauseAsync()
        .then(() => {
          soundIsPlaying.current = false;
          setOnPlay(false);
        })
        .catch((e: any) => {
          console.log('HERE7');
          console.log(e);
        });
  }, []);

  const play = useCallback(async () => {
    if (!record.current) {
      setWaitingForLoad(true);
      return;
    }
    const { sound, status } = record.current;

    try {
      const currentStatus = await sound.getStatusAsync();
      if (!currentStatus.isLoaded) {
        setWaitingForLoad(true);
        return;
      }
      const fullDuration =
        currentStatus.durationMillis ??
        status.durationMillis ??
        status.playableDurationMillis ??
        0;
      const isRecordIncomplete =
        fullDuration * 0.9 > currentStatus.positionMillis;
      if (currentStatus.positionMillis && isRecordIncomplete) {
        record.current.sound
            .playAsync()
            .then(() => {
              setCurrentPlayer({
                isMountedComponent: isMounted,
                pauseSound: pause,
                sound,
              });
            })
            .catch((e: any) => {
              console.log('HERE6');
              console.log(e);
            });
        return;
      }
      record.current.sound
          .replayAsync()
          .then(() => {
            setCurrentPlayer({
              isMountedComponent: isMounted,
              pauseSound: pause,
              sound,
            });
          })
          .catch((e: any) => {
            console.log('HERE2');
            console.log(e);
          });
    } catch (e) {
      console.log('HERE');
      console.log(e);
    }
  }, [pause]);

  useEffect(() => {
    createSound(uri, (soundStatus) => {
      if (soundStatus.isPlaying) {
        if (!soundIsPlaying.current) {
          setOnPlay(true);
        }
        soundIsPlaying.current = true;
        const fullDuration =
          soundStatus.durationMillis ??
          record.current?.status?.playableDurationMillis ??
          soundStatus.positionMillis;
        const current = soundStatus.positionMillis;
        progressController.current.setWidth(
          current > fullDuration ? 100 : (current * 100) / fullDuration,
        );
      }
      if (soundStatus.didJustFinish) {
        progressController.current.setWidth(0);
        soundIsPlaying.current = false;
        setOnPlay(false);
        cleanCurrentPlayer();
      }
    })
        .then((soundData) => {
          if (!isMounted.current) return;
          setAudioLoaded(true);
          if (!soundData) return;
          record.current = soundData;
          if (soundData.status.durationMillis) {
            setDuration(soundData.status.durationMillis);
          }
        })
        .catch((e) => {
          console.log('HERE3');
          console.log(e);
        });
  }, [uri, progressController]);

  useEffect(() => {
    if (!audioLoaded || !waitingForLoad || !record.current) return;
    record.current.sound
        .getStatusAsync()
        .then(async (status) => {
          if (status.isLoaded && !status.isPlaying) {
            try {
              await play();
              setWaitingForLoad(false);
            } catch (e) {
              console.log('HERE4');
              console.log(e);
            }
          }
        })
        .catch((e) => {
          console.log('HERE5');
          console.log(e);
        });
  }, [audioLoaded, play, waitingForLoad]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (record.current) {
        record.current.sound.unloadAsync();
      }
    };
  }, []);

  return {
    isWaitingForLoad: waitingForLoad && !audioLoaded,
    play,
    pause,
    isOnPlay,
    duration,
  };
};
