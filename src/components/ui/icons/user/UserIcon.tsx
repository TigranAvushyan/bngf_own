import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const UserIcon: FC<IconProps> = ({
  color = '#003F96',
  width = 21,
  height = 22,
  viewBox = `0 0 21 22`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        fillRule="evenodd" clipRule="evenodd"
        d="M7 11C5 9.99999 4.19999 8.4 4.19999 6C4.19999 2.7 6.89999 0 10.2 0C13.5 0 16.2 2.7 16.2 6C16.2 8.08545 15.15 9.92385 13.5389 11C18 12 21 17.5 21 20.85C20.8333 21.0667 20.3 21.4 19.5 21C19.1667 18.05 16.47 12 10.35 12C5.39999 12 1.34999 16.05 1.34999 21C1.06666 21.1667 0.4 21.37 0 20.85C0 16.3 2.85 12.2 7 11ZM14.85 6C14.85 8.75 13.1 10.5 10.35 10.5C7.59999 10.5 5.5 8.75 5.5 6C5.5 3.25 7.44999 1.5 10.2 1.5C12.95 1.5 14.85 3.25 14.85 6Z"
        fill={ color } />
    </Svg>
  );
};

export default UserIcon;
