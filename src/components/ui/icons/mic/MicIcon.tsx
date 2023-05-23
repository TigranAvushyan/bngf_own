import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const MicIcon: FC<IconProps> = ({
  color = '#5E637A',
  width = 14,
  height = 20,
  viewBox = `0 0 14 20`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        d="M13.875 11.875H12.625C12.0563 14.3794 9.67624 16.25 7 16.25C4.32376 16.25 1.94374 14.3794 1.375 11.875H0.125C0.676869 14.8744 3.28937 17.1937 6.375 17.4719V18.75H5.75C5.405 18.75 5.125 19.03 5.125 19.375C5.125 19.72 5.405 20 5.75 20H8.25C8.595 20 8.875 19.72 8.875 19.375C8.875 19.03 8.595 18.75 8.25 18.75H7.625V17.4719C10.7106 17.1937 13.3231 14.8744 13.875 11.875ZM7 15C9.41626 15 11.375 13.0413 11.375 10.625V4.375C11.375 1.95874 9.41626 0 7 0C4.58374 0 2.625 1.95874 2.625 4.375V10.625C2.625 13.0413 4.58374 15 7 15ZM3.875 4.375C3.875 2.64937 5.27437 1.25 7 1.25C8.72563 1.25 10.125 2.64937 10.125 4.375V10.625C10.125 12.3506 8.72563 13.75 7 13.75C5.27437 13.75 3.875 12.3506 3.875 10.625V4.375Z"
        fill={ color } />
    </Svg>
  );
};
export default MicIcon;