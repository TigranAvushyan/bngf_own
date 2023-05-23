import React, { FC } from 'react';
import { View } from 'react-native';
import { SCREEN_PADDING } from '../../../style/global.style';

interface HrPropsType {
  marginVertical?: number,
  color?: string,
  marginHorizontal?: number
}

const Hr: FC<HrPropsType> = (
    {
      marginVertical = 1,
      color = '#DEE0E8',
      marginHorizontal = SCREEN_PADDING,
    }) => {
  return (
    <View style={ {
      flex: 1,
      height: 1,
      backgroundColor: color,
      borderRadius: 2,
      flexDirection: 'row',
      marginVertical,
      marginHorizontal,
    } } />
  );
};

export default Hr;
