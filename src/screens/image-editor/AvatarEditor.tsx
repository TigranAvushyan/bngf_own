import { Button, StyleSheet, View } from 'react-native';
import React, { createRef, useEffect, useRef } from 'react';
import { PanGestureHandler, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import MaskedView from '@react-native-community/masked-view';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../../style/global.style';
import { getImageSize } from '../../lib/utils/image/imageUtil';

type PhotoOptions = Partial<{
  translateX: number
  translateY: number
  scale: number
}>

type EditorProps = {
  onAccept: (options?: PhotoOptions) => void
  onClose: () => void
  uri: string
}


type ScaleContext = {
  prevScale: number
}

type MoveContext = {
  startX: number
  startY: number
  blocked: boolean
}

const maskK = 0.9;

const AvatarEditor = ({ onAccept, onClose, uri }: EditorProps) => {
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const imageHeight = useSharedValue(SCREEN_WIDTH * 0.9 * 1.3333);
  const panHandlerRef = useRef(createRef());

  useEffect(() => {
    getImageSize(uri).then(({ height, width }) => {
      const k = height / width;
      imageHeight.value = SCREEN_WIDTH * 0.9 * k;
    });
  }, [uri, imageHeight]);

  const scaleHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent,
      ScaleContext>({
        onStart(event, ctx) {
          ctx.prevScale = 1;
        },
        onActive(event, ctx) {
          const k = scale.value > 1 && event.scale < ctx.prevScale ? 2 : 1;
          scale.value += (event.scale - ctx.prevScale) * k;
          ctx.prevScale = event.scale;
        },
        onFinish() {
          if (scale.value < 1) {
            scale.value = withTiming(1, { duration: 300 });
            return;
          }
          if (scale.value > 3) {
            scale.value = withTiming(3, { duration: 300 });
          }
        },
      });

  const moveHandler = useAnimatedGestureHandler({
    onStart(event, ctx: MoveContext) {
      ctx.startX = offsetX.value;
      ctx.startY = offsetY.value;
    },
    onActive(event, ctx) {
      offsetX.value = ctx.startX + event.translationX;
      offsetY.value = ctx.startY + event.translationY;
    },
    onFinish() {
      const rightScale = scale.value < 1 ? 1 : scale.value > 3 ? 3 : scale.value;
      const maxOffsetX =
          (SCREEN_WIDTH * maskK * (rightScale - 1)) / scale.value / 2;
      if (Math.abs(offsetX.value) > maxOffsetX) {
        offsetX.value = withTiming(Math.sign(offsetX.value) * maxOffsetX, {
          duration: 300,
        });
      }
      const maxOffsetY =
          (imageHeight.value * rightScale - SCREEN_WIDTH * maskK) /
          (scale.value * 2) +
          (Math.sign(offsetY.value) * 19) / scale.value;

      if (Math.abs(offsetY.value) > maxOffsetY) {
        offsetY.value = withTiming(Math.sign(offsetY.value) * maxOffsetY, {
          duration: 300,
        });
      }
    },
  });

  const animatedScale = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  return (
    <View style={ styles.container }>
      <PanGestureHandler
        onGestureEvent={ moveHandler }
        ref={ panHandlerRef.current }
      >
        <Animated.View
          style={ styles.animatedContainer }>
          <PinchGestureHandler
            onGestureEvent={ scaleHandler }
            simultaneousHandlers={ panHandlerRef.current }
          >
            <Animated.View style={ styles.animatedContainer }>
              <MaskedView
                style={ styles.maskContainer }
                maskElement={
                  <View style={ styles.mask }>
                    <View style={ styles.circle } />
                  </View>
                }
              >
                <Animated.Image
                  source={ { uri } }
                  style={ [styles.image, animatedScale] }
                />
              </MaskedView>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>

      <Button title={ 'Отменить' } onPress={ onClose } />
      <Button
        title={ 'Отправить' }
        onPress={ () =>
          onAccept({
            scale: scale.value,
            translateX: offsetX.value,
            translateY: offsetY.value,
          })
        }
      />
    </View>
  );
};
export default AvatarEditor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  mask: {
    backgroundColor: '#00000066',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    borderRadius: 1000,
    backgroundColor: 'white',
  },
  image: {
    alignSelf: 'center',
    width: '90%',
    height: '90%',
    marginTop: '5%',
    resizeMode: 'contain',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    right: 20,
    zIndex: 100,
    elevation: 1,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
  },
  backButton: {},
});
