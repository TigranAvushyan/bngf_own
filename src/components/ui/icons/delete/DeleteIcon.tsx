import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';

const DeleteIcon: FC<IconProps> = ({
  color = '#B52E2E',
  width = 20,
  height = 20,
  viewBox = `0 0 20 20`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        d="M10 0C4.47686 0 0 4.47686 0 10C0 15.5231 4.47686 20 10 20C15.5231 20 20 15.5225 20 10C20 4.47752 15.5231 0 10 0ZM10 18.75C5.16748 18.75 1.25 14.8325 1.25 10C1.25 5.16748 5.16748 1.25 10 1.25C14.8325 1.25 18.75 5.16748 18.75 10C18.75 14.8325 14.8325 18.75 10 18.75ZM13.75 9.375H10.625C10.625 9.375 10.345 9.375 10 9.375C9.655 9.375 9.375 9.375 9.375 9.375H6.25C5.905 9.375 5.625 9.655 5.625 10C5.625 10.345 5.905 10.625 6.25 10.625H9.375H10H10.625H13.75C14.095 10.625 14.375 10.345 14.375 10C14.375 9.655 14.095 9.375 13.75 9.375Z"
        fill={ color } />
    </Svg>
  );
};

export default DeleteIcon;
