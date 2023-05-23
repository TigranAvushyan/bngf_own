import React, { FC, useEffect } from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useStore } from 'effector-react';
import { $unreadCount } from '../../../store/news/unreadNotificationStore';
import { StyleSheet, View } from 'react-native';
import { FONTS, SCREEN_PADDING } from '../../../style/global.style';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import Touchable from '../../../components/ui/touchable/Touchable';
import NotificationCount from '../../../components/ui/notification-count/NotificationCount';
import { Route } from '@react-navigation/routers/src/types';


const ChatNotificationTopTabBar: FC<MaterialTopTabBarProps> = ({ state, navigation }) => {
  const count = useStore($unreadCount);

  const [containerWidth, setContainerWidth] = React.useState(0);

  const [active, setActive] = React.useState(0);
  const animActive = useDerivedValue(() => withTiming(active), [active]);

  const animTextStyle = (idx: number) => useAnimatedStyle(() => {
    const color = interpolateColor(
        animActive.value === idx ? 1 : 0,
        [0, 1],
        ['#5E637A', '#FFF'],
    );
    return { color };
  });

  const animToggleStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: animActive.value * containerWidth / 2,
      }],
    };
  });

  const onPressHandler = React.useCallback((idx: number, route: Route<any>) => {
    setActive(idx);
    const isFocused = 0;
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  }, []);

  useEffect(() => {
    setActive(state.index);
  }, [state.index]);

  return (
    <View style={ styles.container }>
      <View
        style={ styles.itemsContainer }
        onLayout={ ((event) => setContainerWidth(event.nativeEvent.layout.width)) }
      >
        <Animated.View
          style={ [styles.toggle, { width: (containerWidth - 20) / 2 }, animToggleStyle] }
        />
        {
          state.routes.map((route, idx) => {
            // todo
            const getItem = React.useMemo(() => idx === 0 ? {
              title: 'Сообщения',
              count: count.messages,
            } : { title: 'Уведомления', count: count.notifications }, [count, idx]);
            return (
              <Touchable
                onPress={ () => onPressHandler(idx, route) }
                key={ idx }
                style={ styles.textWrapper }
              >
                <Animated.Text
                  key={ idx }
                  style={ [styles.text, animTextStyle(idx)] }
                >{ getItem.title }</Animated.Text>
                <View style={ styles.counter }>
                  <NotificationCount count={ getItem.count } />
                </View>
              </Touchable>
            );
          })

        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  itemsContainer: {
    flexDirection: 'row',
    backgroundColor: '#DAE4F2',
    paddingVertical: 4,
    justifyContent: 'space-around',
    borderRadius: 8,
  },
  toggle: {
    backgroundColor: '#306CBE',
    position: 'absolute',
    borderRadius: 8,
    margin: 4,
    height: '100%',
    left: 0,
  },
  textWrapper: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS['600'],
    marginVertical: 6,
  },
  counter: {
    marginLeft: 7,
  },
});

export default ChatNotificationTopTabBar;
