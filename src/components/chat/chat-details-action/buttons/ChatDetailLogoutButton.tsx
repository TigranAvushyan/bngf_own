import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import styles from '../chatDetailActionStyle';
import GroupLogoutIcon from '../../../ui/icons/logout/GroupLogoutIcon';
import Span from '../../../ui/span/Span';
import { Screens } from '../../../../navigators/main/MainParamList';
import { chatLogout } from '../../../../store/chat/chat-detail/chatDetailStore';

interface ChatDetailLogoutButtonPropsType {
  chatId: number;
  navigate: any;
}

const ChatDetailLogoutButton: FC<ChatDetailLogoutButtonPropsType> = ({ chatId, navigate }) => {
  const onPressHandler = React.useCallback(async () => {
    await chatLogout(chatId);
    navigate(Screens.CHAT_NOTIFICATION);
  }, [chatId]);


  return (
    <Pressable style={ styles.event } onPress={ onPressHandler }>
      <View style={ styles.eventIcon }>
        <GroupLogoutIcon />
      </View>

      <Span>Покинуть</Span>

    </Pressable>
  );
};

export default ChatDetailLogoutButton;
