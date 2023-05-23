import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../style/colors';

interface TakePictureButtonProps {
  onPress: () => void;
}

const BUTTON_SIZE = 75;

const TakePictureButton: FC<TakePictureButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={ onPress } style={ styles.container }>
      <View style={ styles.button } />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: colors.SMALT,
  },
  button: {
    borderRadius: BUTTON_SIZE / 2, backgroundColor: colors.GREY,
    width: '75%',
    height: '75%',
  },
});
export default TakePictureButton;
