import React, { Dispatch, FC, SetStateAction } from 'react';
import { Pressable, TouchableOpacityProps } from 'react-native';


export interface TouchablePropsType {
  setActive?: Dispatch<SetStateAction<boolean>>,
}


const Touchable: FC<TouchablePropsType & TouchableOpacityProps> = (props) => {
  const setActiveHandler = (active: boolean) => {
    if (props.setActive) props.setActive(active);
  };

  return (
    <Pressable
      onPressIn={ () => setActiveHandler(true) }
      onPressOut={ () => setActiveHandler(false) }
      { ...props }
    >
      { props.children }
    </Pressable>
  );
};


export default Touchable;
