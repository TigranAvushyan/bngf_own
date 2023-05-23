import React, { Dispatch, FC, SetStateAction } from 'react';
import CheckBoxIconChecked from '../icons/checkbox/CheckBoxIconChecked';
import CheckBoxIconNotChecked from '../icons/checkbox/CheckboxIconNotChecked';
import { Pressable } from 'react-native';

interface CheckBoxProps {
  isChecked: boolean;
  onPress: Dispatch<SetStateAction<boolean>>
}

const Checkbox:FC<CheckBoxProps> = ({ isChecked, onPress }) => {
  return (
    <Pressable
      onPress={() => {
        if (isChecked) return;
        onPress(true);
      }}
    >
      {
       isChecked ? <CheckBoxIconChecked/> :
         <CheckBoxIconNotChecked/>
      }
    </Pressable>
  );
};


export default Checkbox;
