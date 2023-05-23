import { Dimensions, StatusBar } from 'react-native';

export const LOGIN_SCREEN_PADDING = 20;
export const SCREEN_PADDING = 16;
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight!;

export const zIndex = {
  SWIPE_MENU: 100,
  SWIPE_MENU_BACKDROP: 90,
};

export const CHAT_INPUT_HEIGHT = 73;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;


export const FONTS = {
  200: 'Manrope200',
  300: 'Manrope300',
  400: 'Manrope400',
  500: 'Manrope500',
  600: 'Manrope600',
  700: 'Manrope700',
  800: 'Manrope800',
};
