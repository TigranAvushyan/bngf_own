import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';


const SendMediaIcon: FC<IconProps> = ({
  color = '#306CBE',
  width = 34,
  height = 33,
  viewBox = '0 0 34 33',
  style,
}) => {
  return (

    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path fill-rule="evenodd" clip-rule="evenodd"
        d="M4.91221 0.194651C4.25945 -0.0699802 2.59404 -0.2711 1.15445 1.04147C1.10601 1.1016 1.05296 1.16505 0.997062 1.23191C0.46253 1.87126 -0.332739 2.82248 0.148846 4.16411L4.54173 15.4601L29.116 16.5488L4.49831 17.7132L0.360555 28.0338C0.0782818 28.7395 -0.200463 30.4578 0.942743 31.6857C1.47201 32.3032 2.97511 33.4005 4.75343 32.8501L32.0634 19.6186C32.6985 19.3363 33.9687 18.2742 33.9687 16.2842C33.9334 15.6844 33.6194 14.3259 32.6455 13.6908L4.91221 0.194651Z"
        fill={ color } />
    </Svg>
  );
};

export default SendMediaIcon;
