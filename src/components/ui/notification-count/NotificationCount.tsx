import React, { FC } from 'react';
import Span from '../span/Span';
import { StyleSheet, View } from 'react-native';
import { FONTS } from '../../../style/global.style';

interface NotificationCountPropsType {
  count: number;
}

const NotificationCount: FC<NotificationCountPropsType> = ({ count }) => {
  if (!count) return null;
  return (
    <View style={ styles.container }>
      <Span style={ styles.text }>{ count > 99 ? '99+' : count }</Span>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    backgroundColor: '#EF4747',
    paddingHorizontal: 4,
    paddingVertical: 1,
    minHeight: 14,
    minWidth: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    fontFamily: FONTS['600'],
  },
});

export default NotificationCount;
