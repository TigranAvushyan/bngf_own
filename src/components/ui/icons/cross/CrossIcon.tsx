import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';

const CrossIcon: FC<IconProps> = ({
  color = '#5E637A',
  width = 12,
  height = 12,
  viewBox = `0 0 12 12`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path fillRule="evenodd" clipRule="evenodd"
        d="M1.05022 1.20867C0.659693 1.60158 0.659693 2.23863 1.05022 2.63155L4.58576 6.18875L1.05023 9.74594C0.659704 10.1389 0.659703 10.7759 1.05023 11.1688C1.44075 11.5617 2.07392 11.5617 2.46444 11.1688L5.99997 7.61163L9.5355 11.1688C9.92602 11.5617 10.5592 11.5617 10.9497 11.1688C11.3402 10.7759 11.3402 10.1389 10.9497 9.74594L7.41419 6.18875L10.9497 2.63155C11.3402 2.23863 11.3402 1.60159 10.9497 1.20867C10.5592 0.815751 9.92603 0.815751 9.53551 1.20867L5.99997 4.76587L2.46443 1.20867C2.07391 0.815749 1.44074 0.815749 1.05022 1.20867Z"
        fill={ color } />

    </Svg>
  );
};

export default CrossIcon;
