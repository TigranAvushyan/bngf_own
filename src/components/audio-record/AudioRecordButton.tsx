import React, { useRef, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import RecordIndicator, { RecordIndicatorInterface } from './RecordIndicator';
import AudioRecordButtonInteraction from './AudioRecordButtonInteraction';
import { IconProps } from '../ui/icons/_types';
import MicIcon from '../ui/icons/mic/MicIcon';
import { useAudioRecord } from '../../lib/hooks/audio/useAudioRecord';

export type AudioFileData = {
  type: 'audio'
  data: { uri: string; name?: string }
}

type AudioRecordButtonProps = {
  onRecordComplete: (audio: AudioFileData) => void
  onRecordStart: () => void
  onRecordEnd: () => void
  style?: StyleProp<ViewStyle>
} & IconProps

const AudioRecordButton = ({
  onRecordComplete,
  onRecordStart,
  onRecordEnd,
  style,
  color,
}: AudioRecordButtonProps) => {
  const recordIndicator = useRef<RecordIndicatorInterface | null>(null);
  const [isRecordStarted, setRecordStarted] = useState(false);
  const { stop, start } = useAudioRecord();

  const stopRecord = (stopProps?: Parameters<typeof stop>[0]) => {
    setRecordStarted(false);
    onRecordEnd();
    if (recordIndicator.current) recordIndicator.current.setFront(0);

    stop(stopProps)
        .then((uri) => {
          if (uri) onRecordComplete({ type: 'audio', data: { uri } });
        })
        .catch((e) => {
          console.log('on stop', e);
        });
  };

  const stopWithoutSending = () => {
    stopRecord({ preventSending: true });
  };

  const startRecord = () => {
    setRecordStarted(true);
    onRecordStart();
    start({
      onRecordStart() {
        if (recordIndicator.current) recordIndicator.current.setFront(1);
      },
      onRecord(status) {
        if (recordIndicator.current) {
          recordIndicator.current.setBack(status?.metering);
        }
      },
    }).catch();
    return;
  };

  return (
    <AudioRecordButtonInteraction
      isActionForbidden={ !isRecordStarted }
      onCancel={ stopWithoutSending }
      onComplete={ stopRecord }
      onStart={ startRecord }
      style={ style }
    >
      <RecordIndicator controller={ recordIndicator } />
      <View style={ styles.sendWrapper }>
        <MicIcon color={ isRecordStarted ? 'white' : color } />
      </View>
    </AudioRecordButtonInteraction>
  );
};

const styles = StyleSheet.create({
  sendWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 4,
  },
});

export default AudioRecordButton;

