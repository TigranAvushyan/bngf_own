import React, { FC } from 'react';
import SwipeMenuContent from './SwipeMenuContent';
import { Pressable, StyleSheet } from 'react-native';
import { zIndex } from '../../style/global.style';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { useStore } from 'effector-react';
import { $visibleSwipeMenu, hideSwipeMenu } from '../../store/ui/swipe-menu/swipeMenuStore';
import { colors } from '../../style/colors';

const SwipeMenu: FC = () => {
  const visibleSwipeMenu = useStore($visibleSwipeMenu);

  const swipeMenuShowValue = useDerivedValue(() => {
    //  0  -> show
    // -1  -> hide
    return visibleSwipeMenu ? 0 : -1;
  }, [visibleSwipeMenu]);

  const backDropShowValue = useDerivedValue(() => {
    return visibleSwipeMenu ? 1 : 0;
  }, [visibleSwipeMenu]);

  const swipeMenuAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(swipeMenuShowValue.value * 100 + '%'),
    };
  });

  const backDropAnimatedStyle = useAnimatedStyle(() => {
    return {
      right: withTiming(swipeMenuShowValue.value * 100 + '%', {
        duration: 50,
      }),
      opacity: withTiming(backDropShowValue.value),
    };
  });

  return (
    <>
      <Animated.View style={ [styles.swipeMenu, swipeMenuAnimatedStyle] }>
        <SwipeMenuContent />
      </Animated.View>
      <Animated.View style={ [styles.backdrop, backDropAnimatedStyle] }>
        <Pressable style={ styles.backdropClickArea } onPress={ () => hideSwipeMenu() } />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  swipeMenu: {
    position: 'absolute',
    width: '70%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: zIndex.SWIPE_MENU,
  },
  backdrop: {
    backgroundColor: colors.BACKDROP_BACKGROUND_COLOR,
    position: 'absolute',
    width: '100%',
    top: 0,
    right: 0,
    height: '100%',
    zIndex: zIndex.SWIPE_MENU_BACKDROP,
  },
  backdropClickArea: {
    zIndex: zIndex.SWIPE_MENU_BACKDROP,
    flex: 1,
  },
});

export default SwipeMenu;
