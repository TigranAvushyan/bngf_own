import React, { FC, FormEvent } from 'react';
import { View } from 'react-native';
import Touchable from '../touchable/Touchable';
import Span from '../span/Span';
import getIcon, { ButtonIconType } from './getIcon';
import { ButtonStyle, ButtonType, getStyle } from './buttonStyles';

interface ButtonPropsType {
  onPress: (e?: FormEvent<HTMLFormElement> | undefined) => void,
  title: string,
  style?: ButtonStyle,
  disabled?: boolean,
  type?: ButtonType,
  icon?: ButtonIconType,
  iconColor?: string,
  iconActiveColor?: string
}


const Button: FC<ButtonPropsType> = ({
  type = 'blue',
  icon,
  title,
  onPress,
  style,
  disabled = false,
}) => {
  const [isActive, setActive] = React.useState(false);

  return (
    <Touchable
      onPress={ () => disabled ? null : onPress() }
      setActive={ setActive }
      style={ getStyle(type, 'container', isActive, disabled, style) }
    >
      <Span style={ getStyle(type, 'text', isActive, disabled, style) }>{ title }</Span>
      <View style={ getStyle(type, 'icon', isActive, disabled, style) }>
        {
          icon && getIcon(icon, {
            ...style?.icon?.props,
            color: isActive ? style?.icon?.activeColor : style?.icon?.color,
          })
        }
      </View>
    </Touchable>
  );
};


export default Button;
