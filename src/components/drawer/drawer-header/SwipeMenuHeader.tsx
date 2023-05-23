import React, { FC } from 'react';
import Avatar from '../../ui/avatar/Avatar';
import { Pressable, StyleSheet, View } from 'react-native';
import Span from '../../ui/span/Span';
import { FONTS, SCREEN_PADDING } from '../../../style/global.style';
import { $profile } from '../../../store/auth/profileStore';
import { useStore } from 'effector-react';
import { hideSwipeMenu } from '../../../store/ui/swipe-menu/swipeMenuStore';


const SwipeMenuHeader: FC = () => {
  const profile = useStore($profile);

  return (
    <Pressable onPress={() => hideSwipeMenu()} style={ styles.header }>
      <Avatar uri={ profile?.avatar } />
      <View style={ styles.nameContainer }>
        <Span style={ styles.name }>{ profile?.first_name }</Span>
        <Span style={ styles.name }>{ profile?.last_name }</Span>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 72,
    backgroundColor: '#003F96',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING,
  },
  nameContainer: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: FONTS['700'],
    color: '#FFF',
  },
});

export default SwipeMenuHeader;
