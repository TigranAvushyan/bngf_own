import React, { FC } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { IconProps } from '../_types';

const CheckBoxIconNotChecked: FC<IconProps> = ({
  color = '#BEC6CD',
  width = 14,
  height = 14,
  viewBox = `0 0 14 14`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } fill="none">
      <Circle cx="7" cy="7" r="6.5" stroke={ color } />
    </Svg>
  );
};


export default CheckBoxIconNotChecked;
