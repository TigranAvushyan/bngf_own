import React, { FC } from 'react';
import Svg, { Line, Path } from 'react-native-svg';
import { IconProps } from '../_types';

const BellDisableIcon: FC<IconProps> = ({
  color = '#FFFFFF',
  width = 20,
  height = 20,
  viewBox = `0 0 20 20`,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox }>

      <Path
        d="M16.6667 12V6.66668C16.6667 2.98465 13.682 0 9.99999 0C6.318 0 3.33335 2.98465 3.33335 6.66668V12L0.666672 17.3333H6.734C7.04267 18.8547 8.38734 20 9.99999 20C11.6126 20 12.9573 18.8547 13.266 17.3333H19.3333L16.6667 12ZM9.99999 18.6666C9.13065 18.6666 8.39802 18.1087 8.12265 17.3333H11.878C11.602 18.1087 10.8693 18.6666 9.99999 18.6666ZM2.66669 16L4.66667 12V6.66668C4.66667 3.72134 7.05466 1.33335 9.99999 1.33335C12.9453 1.33335 15.3333 3.72134 15.3333 6.66668V12L17.3333 16H2.66669V16Z"
        fill={ color } />
      <Line x1="0.860937" y1="1.09375" x2="20.8609" y2="20.0938" stroke="#003F96" strokeWidth="2.5" />
    </Svg>
  );
};

export default BellDisableIcon;
