import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { useProgressIndicator } from './hook.progressIndicator';

type ProgressIndicatorProps = {
  value: number
  isVisiblePercent?: boolean
  title?: string
  hidden?: boolean
  style?: ViewStyle | Array<ViewStyle>
  progressBackground?: ViewStyle
  progressLineColor?: ViewStyle
  percentValueStyle?: TextStyle
  titleStyle?: TextStyle
}

export const ProgressIndicator = ({
  value,
  style,
  titleStyle,
  percentValueStyle,
  progressBackground,
  progressLineColor,
  hidden = false,
  title,
  isVisiblePercent = true,
}: ProgressIndicatorProps) => {
  const { animatedStyle, setFullWidth } = useProgressIndicator(value);

  if (hidden) {
    return null;
  }

  return (
    <View style={ [styles.container, style] }>
      <View
        onLayout={ (state) => setFullWidth(state.nativeEvent.layout.width) }
        style={ [styles.progressBackground, progressBackground] }
      />
      <Animated.View
        style={ [styles.progressLine, animatedStyle, progressLineColor] }
      />
      <View style={ styles.textWrapper }>
        <Text style={ [styles.text, titleStyle] }>
          { title || `$uploadsFiles...` }
        </Text>
      </View>
      { isVisiblePercent ? (
        <View style={ styles.percentWrapper }>
          <Text style={ [styles.percentValue, percentValueStyle] }>
            { value.toFixed(0) }%
          </Text>
        </View>
      ) : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    position: 'absolute',
  },
  progressBackground: {
    height: 17,
    backgroundColor: '#B5D3F0',
    borderRadius: 4,
  },
  progressLine: {
    height: 17,
    width: 0,
    left: 16,
    borderRadius: 4,
    position: 'absolute',
    backgroundColor: 'red',
  },
  textWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'IBMPlex-500',
  },
  percentWrapper: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  percentValue: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'IBMPlex-500',
    marginRight: 5,
  },
});
