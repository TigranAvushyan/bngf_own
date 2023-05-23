import React, { FC } from 'react';
import Svg, { Circle, Ellipse, G, Mask } from 'react-native-svg';
import { IconProps } from '../_types';


const AvatarDefault: FC<IconProps> = ({
  width = 40,
  height = 40,
  viewBox = '0 0 40 40',
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } fill="none">
      <Circle cx="20" cy="20" r="20" fill="#B4C8E8" />
      <Mask id="mask0_4073_5210" x="0" y="0" width="40" height="40">
        <Circle cx="20" cy="20" r="20" fill="#C4C4C4" />
      </Mask>
      <G mask="url(#mask0_4073_5210)">
        <Ellipse cx="20.0001" cy="35.1994" rx="15.2" ry="8.8" fill="#3D5563" />
      </G>
      <Ellipse cx="20" cy="16.9998" rx="7.2" ry="7.2" fill="#3D5563" />
    </Svg>
  );
};

export default AvatarDefault;
