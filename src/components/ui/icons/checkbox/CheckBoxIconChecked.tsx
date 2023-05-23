import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';

const CheckBoxIconChecked: FC<IconProps> = ({
  color = '#BEC6CD',
  width = 14,
  height = 14,
  viewBox = `0 0 14 14`,
  style,
}) => {
  return (
    <Svg width={ width } height={height} viewBox={ viewBox } fill="none">
      <Path d="M13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7C0.5 3.41015 3.41015 0.5 7 0.5C10.5899 0.5 13.5 3.41015 13.5 7ZM7 11.5C9.48528 11.5 11.5 9.48528 11.5 7C11.5 4.51472 9.48528 2.5 7 2.5C4.51472 2.5 2.5 4.51472 2.5 7C2.5 9.48528 4.51472 11.5 7 11.5ZM7.5 7C7.5 7.27614 7.27614 7.5 7 7.5C6.72386 7.5 6.5 7.27614 6.5 7C6.5 6.72386 6.72386 6.5 7 6.5C7.27614 6.5 7.5 6.72386 7.5 7Z" stroke={ color }/>
      <Path d="M7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11Z" fill={ color }/>
    </Svg>
  );
};


export default CheckBoxIconChecked;
