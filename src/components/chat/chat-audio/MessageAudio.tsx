import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import Span from '../../ui/span/Span';
import PlayBackButton from '../../audio-record/PlayBackButton';
import { useAudioMessage } from '../../../lib/hooks/audio/useAudioMessage';
import LocalProgressIndicator, { ProgressIndicatorController } from '../../progress-indicator/LocalProgressIndicator';
import useCache from '../../../lib/hooks/cache/useCache';

type MessageAudioProps = {
  audioURI?: string
  isLoading?: boolean
}

const initialController: ProgressIndicatorController = {
  setWidth() {
  },
};

const MessageAudio = ({ audioURI, isLoading }: MessageAudioProps) => {
  const { uri } = useCache(audioURI || '');
  const progressController = useRef(initialController);

  const { isWaitingForLoad, pause, play, isOnPlay, duration } = useAudioMessage(
      {
        uri,
        progressController,
      },
  );

  if (!uri) return null;
  return (
    <View style={ styles.container }>
      <PlayBackButton
        isLoading={ isWaitingForLoad || isLoading }
        onPress={ play }
        onPressToActive={ pause }
        isActive={ isOnPlay }
      />
      <View style={ styles.progressContainer }>
        <LocalProgressIndicator
          controller={ progressController }
          style={ { container: styles.progressIndicator } }
        >
          <TouchableOpacity activeOpacity={ 1 } style={ styles.marker } />
        </LocalProgressIndicator>
        <View style={ styles.durationContainer }>
          { duration ? (
            <Span style={ styles.durationText }>
              { moment(duration).format('mm:ss') }
            </Span>
          ) : null }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  progressContainer: {
    flexGrow: 1,
    flex: 1,
    marginLeft: 10,
    paddingTop: 7,
  },
  progressIndicator: {
    height: 2,
    marginLeft: 0,
    maxHeight: 2,
  },
  marker: {
    position: 'absolute',
    right: 0,
    height: 12,
    width: 12,
    backgroundColor: '#4F6A87',
    borderRadius: 10,
    transform: [
      {
        translateX: 6,
      },
      { translateY: -5 },
    ],
  },
  durationContainer: {
    marginTop: 8,
    height: 15,
  },
  durationText: {
    color: '#4F6A87',
    fontSize: 11,
  },
});

export default MessageAudio;
