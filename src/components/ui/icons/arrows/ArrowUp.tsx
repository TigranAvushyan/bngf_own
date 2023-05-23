import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';

const ArrowUP = ({
  color = '#363F52',
  width = 16,
  height = 10,
  viewBox = `0 0 16 10`,
  style,
}: IconProps) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path d="M7.99932 1.95908L14.8569 9.46694C15.1184 9.72903 15.5425 9.72903 15.8039 9.46694C16.0654 9.20485 16.0654 8.77938 15.8039 8.51728L8.50684 0.52793C8.36746 0.387884 8.18206 0.328528 8.00001 0.337862C7.81728 0.328528 7.63256 0.387884 7.49316 0.52793L0.196089 8.51728C-0.0653362 8.77938 -0.0653362 9.20485 0.196089 9.46694C0.457494 9.72903 0.881653 9.72903 1.14306 9.46694L7.99932 1.95908Z" fill="#5E637A"/>
    </Svg>
  );
};

export default ArrowUP;
