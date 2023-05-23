import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';

const DownloadIcon: FC<IconProps> = ({
  color = '#5E637A',
  width = 32,
  height = 32,
  viewBox = `0 0 32 32`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path d="M31 22C30.448 22 30 22.448 30 23V30H2V23C2 22.448 1.552 22 1 22C0.448 22 0 22.448 0 23V31C0 31.552 0.448 32 1 32H31C31.552 32 32 31.552 32 31V23C32 22.448 31.552 22 31 22Z" fill="#121313"/>
      <Path d="M15.27 23.707C15.659 24.092 16.31 24.096 16.699 23.707L23.698 16.807C24.093 16.416 24.092 15.783 23.698 15.393C23.304 15.002 22.664 15.002 22.27 15.393L16.995 20.593V1C16.995 0.448 16.543 0 15.985 0C15.427 0 14.975 0.448 14.975 1V20.593L9.7 15.393C9.305 15.002 8.666 15.002 8.272 15.393C7.877 15.784 7.877 16.417 8.272 16.807L15.27 23.707Z" fill={color}/>
    </Svg>
  );
};

export default DownloadIcon;
