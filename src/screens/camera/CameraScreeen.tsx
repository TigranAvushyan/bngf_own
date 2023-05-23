import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import { getCameraPermission } from '../../lib/permissions/cameraPermission';
import { Camera } from 'expo-camera';
import TakePictureButton from '../../components/ui/buttons/TakePictureButton';
import { colors } from '../../style/colors';
import { useIsFocused } from '@react-navigation/native';


const CameraScreen = ({ navigation }: MainStackNavProps<Screens.CAMERA>) => {
  const [cameraPermission, setCameraPermission] = useState(false);

  const cameraRef = useRef<Camera>(null);

  const [key, setKey] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    setKey((p) => p + 1);
  }, [isFocused]);


  useEffect(() => {
    getCameraPermission().then(setCameraPermission);
  }, []);


  const takePicture = async () => {
    const camera = cameraRef.current;
    if (camera) {
      const picture = await camera.takePictureAsync({
        quality: 0.65,
      });
      navigation.navigate(Screens.CAMERA_RESULT, { image: [{ uri: picture.uri }] });
    }
  };

  if (!cameraPermission) return <View />;


  return (
    <View style={ styles.container }>
      <Camera
        autoFocus={false}
        key={ key }
        style={ styles.camera }
        ratio={ '4:3' }
        ref={ cameraRef }
        type={ Camera.Constants.Type.back }
      />
      <View style={ styles.takePictureButton }>
        <TakePictureButton onPress={ takePicture } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.BLACK,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  takePictureButton: {
    position: 'absolute',
    bottom: 50,
  },
});

export default CameraScreen;
