import React, { FC } from 'react';
import Animated, { Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import SendIcon from '../../icons/send/SendIcon';

interface SendMessageButtonProps {
  onPress: () => void;
  width?: number;
  height?: number;
}

const SendMessageButton: FC<SendMessageButtonProps> = ({ onPress, width = 22, height = 17 }) => {
  return (
    <Animated.View
      entering={ ZoomIn }
      exiting={ ZoomOut }
      layout={ Layout }
    >
      <Pressable
        onPress={ onPress }
        style={ { width: 25, marginLeft: 4 } }>
        <SendIcon
          height={height}
          width={width}
        />
      </Pressable>
    </Animated.View>
  );
};


export default SendMessageButton;
