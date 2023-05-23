import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';

const PlusIcon: FC<IconProps> = ({
  color = '#003F96',
  width = 18,
  height = 18,
  viewBox = `0 0 18 18`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path fillRule="evenodd" clipRule="evenodd"
        d="M17.0999 8.1H9.90005V0.899945C9.90005 0.403253 9.4968 0 8.99995 0C8.50325 0 8.1 0.403253 8.1 0.899945V8.1H0.899945C0.403253 8.1 0 8.50325 0 8.99995C0 9.4968 0.403253 9.90005 0.899945 9.90005H8.1V17.0999C8.1 17.5968 8.50325 18.0001 8.99995 18.0001C9.4968 18.0001 9.90005 17.5968 9.90005 17.0999V9.90005H17.0999C17.5968 9.90005 18.0001 9.4968 18.0001 8.99995C18.0001 8.50325 17.5968 8.1 17.0999 8.1Z"
        fill={ color } />

    </Svg>
  );
};

export default PlusIcon;
