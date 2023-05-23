import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';

const ArrowDown = ({
  color = '#363F52',
  width = 16,
  height = 10,
  viewBox = `0 0 16 10`,
  style,
}: IconProps) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path d="M8.00068 8.04092L1.14306 0.533059C0.881633 0.270967 0.457494 0.270967 0.196069 0.533059C-0.0653563 0.795151 -0.0653563 1.22062 0.196069 1.48272L7.49316 9.47207C7.63254 9.61212 7.81794 9.67147 7.99999 9.66214C8.18272 9.67147 8.36744 9.61212 8.50684 9.47207L15.8039 1.48272C16.0653 1.22062 16.0653 0.795151 15.8039 0.533059C15.5425 0.270967 15.1183 0.270967 14.8569 0.533059L8.00068 8.04092Z" fill="#5E637A"/>
    </Svg>
  );
};


export default ArrowDown;
