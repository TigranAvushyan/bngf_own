import React from 'react';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import GallerySwiper from 'react-native-gallery-swiper';
import { Pressable, StyleSheet, View } from 'react-native';
import CrossIcon from '../../components/ui/icons/cross/CrossIcon';
import { colors } from '../../style/colors';
import SendIcon from '../../components/ui/icons/send/SendIcon';
import { useSendMessage } from '../../lib/hooks/chat/useSendMessage';
import { useStore } from 'effector-react';
import { $activeChat } from '../../store/chat/chat-detail/chatDetailStore';


const CameraResultScreen = ({ route, navigation }: MainStackNavProps<Screens.CAMERA_RESULT>) => {
  const images = route.params.image;

  const activeChat = useStore($activeChat);
  const { sendMedia } = useSendMessage(activeChat?.id || 0);

  const cancel = () => {
    navigation.navigate(Screens.CAMERA);
  };

  const send = () => {
    sendMedia(images);
    navigation.pop(2);
  };

  return (
    <View style={ styles.container }>
      <GallerySwiper images={ images } />

      <Pressable style={styles.cancelButton} onPress={ cancel }>
        <CrossIcon color={ colors.WHITE } width={ 24 } height={ 24 } />
      </Pressable>

      <Pressable style={styles.sendButton} onPress={ send }>
        <SendIcon color={ colors.WHITE } width={ 44 } height={ 34 } />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },

  sendButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },

});

export default CameraResultScreen;
