import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const ClipIcon: FC<IconProps> = ({
  color = '#5E637A',
  width = 20,
  height = 20,
  viewBox = `0 0 20 20`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        d="M18.9729 7.27974L8.80858 17.3312C7.12442 18.9968 4.39361 18.9968 2.70945 17.3312C1.02529 15.6656 1.02529 12.9655 2.70945 11.2999L11.8578 2.2537C12.9808 1.14352 14.8006 1.14352 15.9237 2.2537C17.0467 3.36384 17.0467 5.1644 15.9237 6.27455L6.7753 15.3208C6.21415 15.8762 5.30388 15.8762 4.74202 15.3208C4.18087 14.7661 4.18087 13.8658 4.74202 13.3103L12.8737 5.26932L11.8571 4.26412L3.72611 12.3058C2.6031 13.416 2.6031 15.2165 3.72611 16.3267C4.84912 17.4369 6.66895 17.4369 7.79196 16.3267L16.9403 7.28046C18.6245 5.61488 18.6245 2.91479 16.9403 1.24918C15.2562 -0.416395 12.5254 -0.416395 10.8412 1.24918L1.1845 10.798L1.21949 10.8329C-0.534654 13.0633 -0.380445 16.2874 1.69283 18.3371C3.7661 20.3868 7.02519 20.5403 9.2812 18.8047L9.31619 18.8397L19.9888 8.28566L18.9729 7.27974Z"
        fill={ color } />
    </Svg>
  );
};
export default ClipIcon;