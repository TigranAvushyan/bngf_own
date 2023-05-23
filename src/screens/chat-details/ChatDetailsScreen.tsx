import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatDetailsMTTNavigator from '../../navigators/chat-details/chat-details-MTT-navigator/ChatDetailsMTTNavigator';
import ChatDetailsAction from '../../components/chat/chat-details-action/ChatDetailsAction';
import AvatarSelectBottomPopup from '../../components/popups/AvatarSelectBottomPopup';
import { Asset } from 'expo-media-library';
import NotificationBottomPopup from '../../components/popups/NotificationBottomPopup';
import { hideAvatarSelectImagePopup } from '../../store/ui/popup/avatarPopupStore';
import { updateChatImageAndTitleHttp } from '../../store/chat/chat-detail/chatDetailStore';


const ChatDetailsScreen = () => {
  const onSendMedia = async (items: Asset) => {
    await updateChatImageAndTitleHttp({ image: items.uri });
    hideAvatarSelectImagePopup();
  };


  return (
    <View style={ styles.itemsContainer }>

      <ChatDetailsAction />
      <ChatDetailsMTTNavigator />

      <AvatarSelectBottomPopup
        onDismiss={ hideAvatarSelectImagePopup }
        onSelect={ onSendMedia } />

      <NotificationBottomPopup />

    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },


});

export default ChatDetailsScreen;
