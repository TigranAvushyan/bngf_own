import { StyleProp, ViewStyle } from 'react-native';
import { SCREEN_HEIGHT } from '../../../../style/global.style';

type SideType = 'left' | 'right'


export const containerStyle = (side: SideType): StyleProp<ViewStyle> => {
  if (side === 'right') {
    return {
      alignSelf: 'flex-end',
      flexDirection: 'row-reverse',
    };
  } else {
    return {
      alignSelf: 'flex-start',
      flexDirection: 'row',
    };
  }
};
export const sideStyle = (side: SideType): StyleProp<ViewStyle> => {
  if (side === 'right') {
    return {
      borderBottomRightRadius: 0,
      backgroundColor: '#DCFBDA',
    };
  } else {
    return {
      borderBottomLeftRadius: 0,

    };
  }
};


export const getBackdropModalPosition = (y: number, height: number): ViewStyle => {
  return (y < SCREEN_HEIGHT / 2) ?
      { top: height + 6 } :
      { bottom: height + 6 };
};
