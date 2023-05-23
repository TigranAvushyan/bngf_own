import React from 'react';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import { StyleSheet, View } from 'react-native';
import AvatarEditor from './AvatarEditor';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';


const ImageEditorScreen = ({ route }: MainStackNavProps<Screens.IMAGE_EDITOR>) => {
  const { navigate } = useMainNavigation();
  return (
    <View style={ styles.container }>
      <AvatarEditor
        onAccept={ () => navigate(Screens.CREATE_GROUP) }
        onClose={ () => navigate(Screens.CREATE_GROUP) }
        uri={ 'data:image/jpeg;base64,' + route.params.image_uri } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageEditorScreen;
