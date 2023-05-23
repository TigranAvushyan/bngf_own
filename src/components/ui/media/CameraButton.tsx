import React from 'react';
import { mediaSelectStyles as styles } from './styles';
import CameraIcon from '../icons/camera/CameraIcon';
import { useMainNavigation } from '../../../lib/hooks/navigation/useNavigation';
import { Screens } from '../../../navigators/main/MainParamList';
import { Pressable } from 'react-native';


const CameraButton = () => {
  const { navigate } = useMainNavigation();
  const onPressHandler = () => {
    navigate(Screens.CAMERA);
  };

  return (
    <Pressable style={ styles.image } onPress={ onPressHandler }>
      <CameraIcon />
    </Pressable>);
};

export default CameraButton;
