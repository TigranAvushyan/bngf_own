import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const ArrowIcon: FC<IconProps> = ({
  color = '#ffffff',
  width = 10,
  height = 16,
  viewBox = `0 0 10 16`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } fill="none" style={ style }>
      <Path
        d="M1.9589 8.00068L9.46676 1.14306C9.72885 0.881633 9.72885 0.457494 9.46676 0.196069C9.20467 -0.0653563 8.77919 -0.0653563 8.5171 0.196069L0.527747 7.49316C0.387701 7.63254 0.328345 7.81794 0.337678 7.99999C0.328345 8.18272 0.387701 8.36744 0.527747 8.50684L8.5171 15.8039C8.77919 16.0653 9.20467 16.0653 9.46676 15.8039C9.72885 15.5425 9.72885 15.1183 9.46676 14.8569L1.9589 8.00068Z"
        fill={ color } />
    </Svg>

  );
};


export default ArrowIcon;
