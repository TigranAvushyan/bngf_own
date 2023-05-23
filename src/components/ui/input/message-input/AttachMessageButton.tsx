import React, { FC } from 'react';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import ClipIcon from '../../icons/clip/ClipIcon';

interface AttachMessageButtonPropsType {
  onPress: () => void
}

const AttachMessageButton: FC<AttachMessageButtonPropsType> = ({ onPress }) => {
  return (
    <Animated.View
      entering={ FadeInLeft }
      exiting={ FadeOutLeft }
    >
      <Pressable onPress={ onPress }>
        <ClipIcon style={ { width: 25 } } />
      </Pressable>
    </Animated.View>
  );
};

export default AttachMessageButton;
