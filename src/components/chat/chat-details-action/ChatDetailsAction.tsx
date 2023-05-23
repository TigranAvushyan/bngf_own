import React, { FC } from 'react';
import { View } from 'react-native';
import { useStore } from 'effector-react';
import { $amIAdminOnCurrentChat, $currentChatDetail } from '../../../store/chat/chat-detail/chatDetailStore';
import ChatDetailSearchButton from './buttons/ChatDetailSearchButton';
import styles from './chatDetailActionStyle';
import ChatDetailAddUserButton from './buttons/ChatDetailAddUserButton';
import ChatDetailNotificationButton from './buttons/ChatDetailNotificationButton';
import ChatDetailLogoutButton from './buttons/ChatDetailLogoutButton';
import ChatDetailAdministratorsButton from './buttons/ChatDetailAdministratorsButton';
import { useMainNavigation } from '../../../lib/hooks/navigation/useNavigation';


const ChatDetailsAction: FC = () => {
  const chatDetail = useStore($currentChatDetail);

  const isAdmin = useStore($amIAdminOnCurrentChat);

  const { navigate } = useMainNavigation();
  const adminMode = isAdmin && !chatDetail?.privat;

  const itemMarginLeft = adminMode ? 0 : 20;

  return (
    <View style={ [styles.itemsContainer, adminMode && styles.itemsContainerAdmin] }>


      <ChatDetailSearchButton chatId={ chatDetail?.id || 0 } />

      {
        adminMode &&
        <>
          <ChatDetailAddUserButton navigate={ navigate } />
          <ChatDetailAdministratorsButton navigate={ navigate } />
        </>
      }

      <View style={ { marginLeft: itemMarginLeft } }>
        <ChatDetailNotificationButton isDisabled={!chatDetail?.notifications.enabled} />
      </View>

      {
        !chatDetail?.privat &&
        <View style={ { marginLeft: itemMarginLeft } }>
          <ChatDetailLogoutButton navigate={ navigate } chatId={ chatDetail?.id || 0 } />
        </View>
      }

    </View>
  );
};


export default ChatDetailsAction;
