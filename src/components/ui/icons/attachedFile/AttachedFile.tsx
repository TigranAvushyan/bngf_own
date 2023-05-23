import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';


const AttachedFile: FC<IconProps> = ({
  width = 44,
  height = 44,
  viewBox = '0 0 44 44',
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } fill="none">
      <Path
        d="M44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22Z"
        fill="#306CBE" />
      <Path d="M33 16.9024L26.95 11V16.9024H33Z" fill="#EEF0F4" />
      <Path fill-rule="evenodd" clip-rule="evenodd"
        d="M11 12.6098C11 11.322 12.1 11 12.65 11H26.4524V17.5476H33V22.8049V31.3902C33 32.678 31.9 33 31.35 33H12.65C11.33 33 11 31.9268 11 31.3902V12.6098Z"
        fill="#EEF0F4" />
    </Svg>
  );
};

export default AttachedFile;
