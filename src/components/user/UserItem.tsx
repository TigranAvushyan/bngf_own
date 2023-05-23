import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Avatar from '../ui/avatar/Avatar';
import Span from '../ui/span/Span';
import { FONTS, SCREEN_PADDING } from '../../style/global.style';

interface UserItemPropsType {
  avatar?: string,
  name: string,
  bottomSide?: ReactNode,
  rightSide?: ReactNode,
  style?: StyleProp<ViewStyle>
}


const UserItem = React.memo<UserItemPropsType>(({
  bottomSide,
  rightSide,
  avatar,
  name,
  style,
}) => {
  return (
    <View style={ [styles.user, style] }>
      <Avatar uri={ avatar } />

      <View style={ styles.userInfo }>
        <Span style={ styles.name }>{ name }</Span>
        { bottomSide }
      </View>
      <View style={styles.rightSide}>
        { rightSide }
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  user: {
    backgroundColor: '#FFF',
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  userInfo: {
    marginLeft: 8,
    flex: 1,
  },
  name: {
    color: '#17303F',
    fontFamily: FONTS['700'],
    fontWeight: '700',
  },
  rightSide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default UserItem;
