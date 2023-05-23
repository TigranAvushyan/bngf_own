import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../_types';
import { View } from 'react-native';


const SendIcon: FC<IconProps> = ({
  color = '#5E637A',
  width = 22,
  height = 17,
  viewBox = '0 0 22 17',
  style,
}) => {
  return (
    <View style={ style }>
      <Svg width={ width } height={ height } viewBox={ viewBox }>
        <Path
          d="M21.6089 8.38387C21.6079 8.16085 21.4606 7.95998 21.2349 7.8733L1.69534 0.368332C1.47177 0.282462 1.21345 0.324687 1.03646 0.475995C0.859538 0.627302 0.797397 0.859202 0.877948 1.06736L3.74305 8.47065L0.950051 15.9015C0.873866 16.1042 0.932152 16.3278 1.09846 16.4775C1.10363 16.4822 1.10891 16.4868 1.11431 16.4913C1.29267 16.6408 1.55145 16.6806 1.77414 16.5925L21.2398 8.89805C21.4648 8.80908 21.61 8.60687 21.6089 8.38387ZM2.49515 1.88626L18.0062 7.8439L4.82556 7.90794L2.49515 1.88626ZM2.55919 15.0669L4.83101 9.0228L18.0117 8.95879L2.55919 15.0669Z"
          fill={ color } />
      </Svg>
    </View>
  );
};

export default SendIcon;
