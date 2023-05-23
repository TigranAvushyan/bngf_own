import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';

const RectangleIcon: FC<IconProps> = ({
  color = '#FFF',
  width = 7,
  height = 7,
  viewBox = `0 0 7 7`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        d="M0 0H7V7H0V0Z"
        fill={ color } />
    </Svg>
  );
};


export default RectangleIcon;
