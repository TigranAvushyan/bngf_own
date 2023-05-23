import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const TriangleIcon: FC<IconProps> = ({
  color = '#FFF',
  width = 8,
  height = 10,
  viewBox = `0 0 8 10`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        d="M7.37297 5.38534L0.956321 9.51034C0.881125 9.55911 0.794286 9.5833 0.708348 9.5833C0.633153 9.5833 0.557055 9.56448 0.489036 9.52736C0.341309 9.44679 0.25 9.29279 0.25 9.12495V0.874953C0.25 0.707117 0.341309 0.553117 0.489036 0.472551C0.634055 0.392887 0.81577 0.397785 0.956321 0.489567L7.37297 4.61457C7.50368 4.6987 7.58335 4.84419 7.58335 4.99995C7.58335 5.15571 7.50368 5.30116 7.37297 5.38534Z"
        fill={ color } />

    </Svg>
  );
};

export default TriangleIcon;
