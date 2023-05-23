import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';


const CircleTickIcon: FC<IconProps> = ({
  color = '#005FFF',
  width = 20,
  height = 20,
  viewBox = '0 0 20 20',
  style,
}) => {
  return (
    <Svg style={ style } width={ width } height={ height } viewBox={ viewBox }>
      <Path fillRule="evenodd" clipRule="evenodd"
        d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM13.7071 7.29286C14.0976 7.68338 14.0976 8.31655 13.7071 8.70707L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68339 6.29289 9.29286C6.68342 8.90234 7.31658 8.90234 7.70711 9.29286L9 10.5858L12.2929 7.29286C12.6834 6.90233 13.3166 6.90233 13.7071 7.29286Z"
        fill={ color } />
    </Svg>
  );
};

export default CircleTickIcon;
