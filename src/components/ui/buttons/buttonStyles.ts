import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { FONTS } from '../../../style/global.style';
import { IconProps } from '../icons/_types';


export interface ButtonStyle {
  container?: StyleProp<ViewStyle>,
  text?: StyleProp<TextStyle>,
  icon?: {
    props?: IconProps,
    style?: StyleProp<ViewStyle>,
    activeStyle?: StyleProp<ViewStyle>,
    disabledStyle?: StyleProp<ViewStyle>,
    color?: string,
    activeColor?: string
  },
  active?: {
    container?: StyleProp<ViewStyle>,
    text?: StyleProp<TextStyle>,
  },
  disabled?: {
    container?: StyleProp<ViewStyle>,
    text?: StyleProp<TextStyle>,
  }
}


interface ButtonTypeStyle {
  primary: ButtonStyle;
  light: ButtonStyle;
  blue: ButtonStyle;
}

export type ButtonType = keyof ButtonTypeStyle


const defaultStyle: ButtonStyle = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS['700'],
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
};

export const buttonStyle: ButtonTypeStyle = {
  blue: {
    container: {
      backgroundColor: '#003F96',
    },
    text: {},
    icon: {},
    disabled: {
      container: {
        backgroundColor: '#4F6A87',
      },
    },
    active: {
      container: {
        backgroundColor: '#144884',
      },
    },
  },

  primary: {
    container: {
      backgroundColor: '#E3EAF0',
    },
    text: {
      color: '#003F96',
    },

    icon: {},
    active: {
      container: {
        backgroundColor: '#CEDAE6',
      },
    },
  },

  light: {
    container: {
      backgroundColor: '#fff',
      borderColor: '#003F96',
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 1,
    },
    text: {
      color: '#003F96',
    },
    icon: {},
    active: {
      container: {
        borderColor: '#0B396F',
      },
      text: {
        color: '#0B396F',
      },
    },
  },

};


export const getStyle = (
    type: ButtonType,
    el: 'container' | 'text' | 'icon',
    isActive: boolean,
    disabled?: boolean,
    style?: ButtonStyle,
): any => {
  if (el === 'icon') {
    return [
      defaultStyle.icon,
      buttonStyle[type].icon?.style,
    isActive && !disabled ? buttonStyle[type].icon?.activeStyle : null,
    disabled ? buttonStyle[type].icon?.disabledStyle : null,
    style ? style.icon : null];
  }

  return [
    defaultStyle[el],
    buttonStyle[type][el],
    isActive && !disabled ? (style?.active?.[el] || buttonStyle[type].active?.[el]) : null,
    disabled ? (style?.disabled?.[el] || buttonStyle[type].disabled?.[el]) : null,
    style ? style[el] : null];
};
