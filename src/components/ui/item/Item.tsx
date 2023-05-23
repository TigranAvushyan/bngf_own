import React, { FC } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import Span from '../span/Span';

export interface ItemStyle {
  key?: StyleProp<TextStyle>,
  value?: StyleProp<TextStyle>,
  container?: StyleProp<TextStyle>,
}

interface ItemPropsType {
  itemKey: string | number,
  value: string | number,
  style?: ItemStyle
}

const Item: FC<ItemPropsType> = ({ itemKey, value, style }) => {
  return (
    <View style={ [styles.event, style?.container] }>
      <Span style={ [styles.key, style?.key] }>{ itemKey }</Span>
      <Span style={ [styles.value, style?.value] }>{ value }</Span>
    </View>
  );
};

const styles = StyleSheet.create({
  event: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  key: {
    flex: 1,
    color: '#5C6880',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    color: '#363F52',
    flex: 1,
  },
});

export default Item;
