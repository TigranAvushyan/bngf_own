import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const CopyIcon: FC<IconProps> = ({
  color = '#5E637A',
  width = 12,
  height = 14,
  viewBox = `0 0 12 14`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        fillRule="evenodd" clipRule="evenodd"
        d="M2.66667 2.99992V0.999919C2.66667 0.631729 2.96514 0.333252 3.33333 0.333252H11.3333C11.7015 0.333252 12 0.631729 12 0.999919V10.3333C12 10.7014 11.7015 10.9999 11.3333 10.9999H9.33334V12.9999C9.33334 13.3679 9.03334 13.6666 8.662 13.6666H0.671332C0.302781 13.6688 0.00221834 13.3718 1.16689e-05 13.0033L0 12.9999L0.002 3.66659C0.002 3.29859 0.302 2.99992 0.673334 2.99992L2.66667 2.99992ZM1.33533 4.33325L1.33333 12.3333H8V4.33325H1.33533ZM9.33334 2.99992H4V1.66659H10.6667V9.66659H9.33334V2.99992Z"
        fill={ color } />
    </Svg>

  );
};

export default CopyIcon;
