import React, { FC } from 'react';
import { View } from 'react-native';
import { areaStyle } from '../areaStyle';
import Span from '../../span/Span';

export interface TextAreaProps {
  text: string,
  title: string
}

const TextArea: FC<TextAreaProps> = ({ title, text }) => {
  return (
    <View style={ areaStyle.container }>
      <Span style={ areaStyle.title }>{ title }</Span>
      <Span style={ areaStyle.text }>{ text }</Span>
    </View>
  );
};

export default TextArea;
