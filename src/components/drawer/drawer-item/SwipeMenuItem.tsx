import React, { FC, ReactNode } from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import Span from '../../ui/span/Span';
import Touchable from '../../ui/touchable/Touchable';

interface DrawerItemPropsType {
  children?: ReactNode,
  text: string,
  onPress: (event: GestureResponderEvent) => void
}

const SwipeMenuItem: FC<DrawerItemPropsType> = ({
  children,
  text,
  onPress,
}) => {
  return (
    <View style={ styles.itemsContainer }>
      <Touchable onPress={ onPress }>
        <View style={ styles.event }>
          <View>{ children }</View>
          <Span style={ styles.text }>{ text }</Span>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    marginTop: 17,
  },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 5,
  },
  text: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default SwipeMenuItem;
