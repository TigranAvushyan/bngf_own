import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useProgressIndicator } from './hook.progressIndicator';
import { useComponentWillMount } from '../../lib/hooks/useComponentWillMount';

export type ProgressIndicatorController = {
  setWidth: (value: number) => void
}

type AudioProgressIndicatorProps = {
  value?: number
  style?: {
    container?: StyleProp<ViewStyle>
    progressLine?: StyleProp<ViewStyle>
  }
  controller?: React.MutableRefObject<null | ProgressIndicatorController>
}

const LocalProgressIndicator: FC<AudioProgressIndicatorProps> = ({
  value,
  style,
  controller,
  children,
}) => {
  const { setFullWidth, animatedStyle, setWidth } = useProgressIndicator(
    !controller ? value : undefined,
  );

  useComponentWillMount(() => {
    if (!controller) return;
    controller.current = { setWidth };
  });

  return (
    <View
      onLayout={ ({ nativeEvent }) => setFullWidth(nativeEvent.layout.width) }
      style={ [styles.progressBackground, style?.container] }
    >
      <Animated.View
        style={ [styles.progressLine, animatedStyle, style?.progressLine] }
      >
        { children }
      </Animated.View>
    </View>
  );
};

export default LocalProgressIndicator;

const styles = StyleSheet.create({
  progressBackground: {
    height: 10,
    flexGrow: 1,
    flex: 1,
    marginLeft: 8,
    borderRadius: 10,
    backgroundColor: '#B7CDE4',
  },
  progressLine: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#4F6A87',
  },
});
