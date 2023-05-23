import React, { FC, ReactText } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { FONTS } from '../../../style/global.style';


export type SpanProp = ReactText[] | string | number


interface SpanPropsType {
  children: SpanProp,
  style?: StyleProp<TextStyle>,
}

const Span: FC<SpanPropsType | TextProps> = (props) => {
  return (
    <Text { ...props } style={ [styles.text, props.style] }>{ props.children }</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS['500'],
    fontWeight: '300',
    color: '#17303F',
  },
});

export default Span;
