import { useCallback, useEffect, useState } from 'react';
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useProgressIndicator = (value = 0) => {
  const [fullWidth, setFullWidth] = useState(1);

  const widthValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(widthValue.value, [0, 100], [0, fullWidth]),
    };
  });

  const setWidth = useCallback(
      (asyncValue: number) => {
        widthValue.value = withTiming(asyncValue, { duration: 100 });
      },
      [widthValue],
  );

  useEffect(() => {
    if (value === undefined) return;
    setWidth(value);
  }, [value, setWidth]);

  return {
    setWidth,
    setFullWidth,
    animatedStyle,
  };
};
