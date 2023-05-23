import React, { createRef, FC, useRef } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { LongPressGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import { StyleProp, ViewStyle } from 'react-native';
import {
  UseDelayActionProps,
  useDelayHandler,
  useMoveHandler,
  UseMoveHandlerProps,
} from '../../lib/hooks/animation/useMoveHandler';

type AudioRecordButtonInteractionProps = {
  style?: StyleProp<ViewStyle>
} & UseMoveHandlerProps &
  UseDelayActionProps

const AudioRecordButtonInteraction: FC<AudioRecordButtonInteractionProps> = ({
  children,
  style,
  onStart,
  onComplete,
  onCancel,
  isActionForbidden,
}) => {
  const panHandlerRef = useRef(createRef());

  const moveHandler = useMoveHandler({
    isActionForbidden,
    onComplete,
    onCancel,
  });

  const delayEvent = useDelayHandler({
    onStart,
  });

  const gestureStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: moveHandler.x.value }],
    };
  });

  return (
    <LongPressGestureHandler
      minDurationMs={ 200 }
      onGestureEvent={ delayEvent }
      ref={ panHandlerRef.current }
    >
      <Animated.View>
        <PanGestureHandler
          simultaneousHandlers={ panHandlerRef.current }
          onGestureEvent={ moveHandler.handler }
        >
          <Animated.View style={ [style, gestureStyle] }>
            { children }
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </LongPressGestureHandler>
  );
};

export default AudioRecordButtonInteraction;
