import React from 'react';
import { StyleSheet, View } from 'react-native';
import Touchable from '../../../components/ui/touchable/Touchable';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { FONTS } from '../../../style/global.style';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TabBarLabel } from '../ChatDetailsParamList';


const TopTabBar = ({ navigation, state }: MaterialTopTabBarProps) => {
  const labelAnimatedStyle = (idx: number) => useAnimatedStyle(() => {
    return {
      // color: interpolateColor(
      //     idx === state.index ? 1 : 0,
      //     [0, 1],
      //     ["#5E637A", "#17303F"]
      // ),
      fontWeight: idx === state.index ? '700' : '500',
    };
  });

  const indicatorAnimStyle = (idx: number) => useAnimatedStyle(() => {
    return {
      bottom: withTiming(state.index === idx ? 0 : -4),
    };
  });

  return (
    <View style={ styles.tabBarContainer }>

      {
        state.routes.map((route, idx) =>
          <Touchable
            key={ route.key }
            onPress={ () => navigation.navigate(route.name) }
            style={ styles.tabBarItem }
          >
            <Animated.Text
              style={ [styles.tabBarLabel, labelAnimatedStyle(idx)] }>{ TabBarLabel[route.name] }</Animated.Text>
            <Animated.View style={ [styles.tabBarIndicator, indicatorAnimStyle(idx)] } />
          </Touchable>,
        )
      }

    </View>
  );
};


const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 18,
    flexDirection: 'row',
  },
  tabBarItem: {
    position: 'relative',
    paddingVertical: 16,
    marginRight: 26,
    height: '100%',
  },
  tabBarLabel: {
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 14,
  },
  tabBarIndicator: {
    width: '100%',
    height: 4,
    position: 'absolute',
    backgroundColor: '#003F96',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});

export default TopTabBar;
