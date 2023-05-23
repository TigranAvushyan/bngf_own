import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const PenLineIcon: FC<IconProps> = ({
  color = '#005FFF',
  width = 10,
  height = 10,
  viewBox = `0 0 10 10`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path fillRule="evenodd" clipRule="evenodd"
        d="M9.50001 9.5H0.5V7.3785L7.2175 0.660996C7.41275 0.465805 7.72925 0.465805 7.9245 0.660996L9.33901 2.0755C9.5342 2.27075 9.5342 2.58725 9.33901 2.7825L3.6215 8.5H9.50001V9.5ZM1.5 8.5H2.207L6.864 3.843L6.157 3.136L1.5 7.793V8.5ZM8.278 2.429L7.571 3.136L6.864 2.429L7.571 1.722L8.278 2.429Z"
        fill={ color } />

    </Svg>
  );
};
export default PenLineIcon;
