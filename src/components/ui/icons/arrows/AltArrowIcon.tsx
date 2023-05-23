import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';


const AltArrowIcon: FC<IconProps> = ({
  color = '#363F52',
  width = 24,
  height = 10,
  viewBox = `0 0 24 10`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        d="M0 5C0 4.4477 0.59696 4 1.33333 4H22.6667C23.4031 4 24 4.4477 24 5C24 5.5523 23.4031 6 22.6667 6H1.33333C0.59696 6 0 5.5523 0 5Z"
        fill={ color } />
      <Path
        d="M18.2929 0.29289C18.6834 -0.09763 19.3166 -0.09763 19.7071 0.29289L23.7071 4.2929C24.0976 4.6834 24.0976 5.3166 23.7071 5.7071C23.3166 6.0976 22.6834 6.0976 22.2929 5.7071L18.2929 1.70711C17.9024 1.31658 17.9024 0.68342 18.2929 0.29289Z"
        fill={ color } />
      <Path
        d="M23.7071 4.29287C24.0976 4.68338 24.0976 5.31658 23.7071 5.70707L19.7071 9.70708C19.3166 10.0976 18.6834 10.0976 18.2929 9.70708C17.9024 9.31658 17.9024 8.68337 18.2929 8.29287L22.2929 4.29287C22.6834 3.90237 23.3166 3.90237 23.7071 4.29287Z"
        fill={ color } />
    </Svg>
  );
};


export default AltArrowIcon;
