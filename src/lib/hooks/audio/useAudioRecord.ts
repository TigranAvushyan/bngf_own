import { RecordingStatus } from 'expo-av/build/Audio/Recording';
import { Audio } from 'expo-av';
import { useCallback, useRef } from 'react';
import { getAudioPermission } from '../../permissions/audioPermission';
import { Timer } from '../../types';


type OnRecord = (status: RecordingStatus | undefined) => void

type StartProps = {
  onRecord?: OnRecord
  onRecordStart?: () => void
}

type StopProps = {
  preventSending?: boolean
}

export const createRecord = async (onRecord?: OnRecord) => {
  const isGranted = await getAudioPermission();
  if (!isGranted) return;
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
        {
          isMeteringEnabled: true, keepAudioActiveHint: false, web: {},
          android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.m4a',
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        },
        onRecord,
        100,
    );
    return recording;
  } catch (e) {
    console.log(e);
  }
};

export const useAudioRecord = () => {
  const record = useRef<Audio.Recording | null>(null);
  const recordNotEnoughLongTimer = useRef<Timer | null>(null);
  /* if user release button faster then createRecord in start function
   * complete creating record, we should to wait till recording start process
   * complete before terminate it */
  const process = useRef({
    inStart: false,
    stopIntention: false,
  });

  const resetRecordTimer = () => {
    if (recordNotEnoughLongTimer.current) {
      clearTimeout(recordNotEnoughLongTimer.current);
      recordNotEnoughLongTimer.current = null;
    }
  };

  const start = useCallback(async ({ onRecord, onRecordStart }: StartProps) => {
    if (record.current) return;
    if (onRecordStart) onRecordStart();
    process.current.inStart = true;
    // startAttempt.current = true
    recordNotEnoughLongTimer.current = setTimeout(resetRecordTimer, 1000);
    try {
      const newRecord = await createRecord(onRecord);
      if (!newRecord) return;
      if (process.current.stopIntention) {
        process.current.stopIntention = false;
        const delay = setTimeout(() => {
          newRecord.stopAndUnloadAsync().catch((e) => {
            console.log('terminate in start', e);
          });
          clearTimeout(delay);
        }, 100);
        return;
      }
      record.current = newRecord;
    } catch (e) {
      console.log(e);
    } finally {
      process.current.inStart = false;
    }
  }, []);

  const stop = useCallback(async ({ preventSending }: StopProps = {}) => {
    if (process.current.inStart) {
      process.current.stopIntention = true;
    }
    if (!record.current) {
      return;
    }
    process.current.stopIntention = false;
    try {
      await record.current.stopAndUnloadAsync();
      if (!recordNotEnoughLongTimer.current && !preventSending) {
        return await record.current.getURI();
      }
    } finally {
      resetRecordTimer();
      record.current = null;
    }
  }, []);

  return {
    start,
    stop,
  };
};
