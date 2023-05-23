import * as React from 'react';
import { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';

export const ArrowBoldIcon: FC<IconProps> = ({
  color = '#363F52',
  width = 12,
  height = 18,
  viewBox = `0 0 12 18`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } fill="none" style={ style }>
      <Path
        d="M4.26608 9.00381L10.9998 2.26976C11.1853 2.08478 11.2873 1.83746 11.2873 1.57376C11.2873 1.3099 11.1853 1.06273 10.9998 0.877463L10.4098 0.287707C10.2247 0.102146 9.97721 0 9.7135 0C9.44979 0 9.20262 0.102146 9.01735 0.287707L0.999742 8.30517C0.813742 8.49102 0.711888 8.73937 0.71262 9.00337C0.711888 9.26854 0.813595 9.51659 0.999742 9.70259L9.00989 17.7123C9.19516 17.8979 9.44233 18 9.70618 18C9.96989 18 10.2171 17.8979 10.4025 17.7123L10.9924 17.1225C11.3762 16.7387 11.3762 16.1138 10.9924 15.7301L4.26608 9.00381Z"
        fill={ color } />
    </Svg>

  );
};


export default ArrowBoldIcon;
