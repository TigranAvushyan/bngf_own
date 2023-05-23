import React, { FC } from 'react';
import { Linking, StyleProp, TextStyle } from 'react-native';
import { linkStyle } from './LinkStyle';
import Span from '../span/Span';


interface LinkPropsType {
  to: string,
  type?: 'tel' | 'mailto' | 'sms' | 'www' | 'telegram',
  style?: StyleProp<TextStyle>
}

const Link: FC<LinkPropsType> = ({ to, type, style }) => {
  const onPressLinking = () => {
    let link = '';
    switch (type) {
      case 'www':
        link = to;
        break;
      case 'telegram':
        link = 'https://t.me/' + to.replace('@', '');
        break;
      default:
        link = `${ type }:${ to }`;
    }
    Linking.openURL(link);
  };
  return (
    <Span onPress={ onPressLinking } style={ [linkStyle.link, style] }>{ to }</Span>
  );
};

export default Link;
