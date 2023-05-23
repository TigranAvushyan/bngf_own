import React, { MutableRefObject } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';
import { useComponentWillMount } from '../../lib/hooks/useComponentWillMount';

export type RecordIndicatorInterface = {
  front: Animated.SharedValue<number>
  back: Animated.SharedValue<number>
  setFront: (value: number) => void
  setBack: (value: number | undefined) => void
}

type RecordIndicatorProps = {
  controller: MutableRefObject<RecordIndicatorInterface | null>
}

const frontSize = 110;
const backSize = 160;
const backMinSize = -160;

const RecordIndicator = ({ controller }: RecordIndicatorProps) => {
  const front = useSharedValue(0);
  const back = useSharedValue(backMinSize);
  const setFront = (value: number) => {
    front.value = withTiming(value, { duration: 200 });
  };
  const setBack = (value: number | undefined) => {
    back.value = value ?
      withTiming(value, { duration: 80 }) :
      withTiming(backMinSize, { duration: 80 });
  };

  useComponentWillMount(() => {
    controller.current = { front, back, setFront, setBack };
  });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const size = interpolate(front.value, [0, 1], [0, frontSize]);
    return {
      width: size,
      height: size,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const size = interpolate(
        back.value,
        [backMinSize, 0],
        [frontSize, backSize],
    );
    const opacity = interpolate(front.value, [0, 1], [0, 1]);
    return {
      width: size,
      height: size,
      opacity,
    };
  });

  return (
    <>
      <Animated.View style={ [styles.active, frontAnimatedStyle] } />
      <Animated.View style={ [styles.activeBack, backAnimatedStyle] } />
    </>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#3579d5',
    position: 'absolute',
    borderRadius: 100,
    zIndex: 3,
  },
  activeBack: {
    backgroundColor: '#306CBE',
    position: 'absolute',
    borderRadius: 100,
    zIndex: 2,
  },
});

export default RecordIndicator;
