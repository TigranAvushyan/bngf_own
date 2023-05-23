import React, { FC } from 'react';
import Span from '../span/Span';
import { StyleSheet, View } from 'react-native';
import Avatar from '../avatar/Avatar';
import { FONTS, SCREEN_PADDING } from '../../../style/global.style';
import Touchable from '../touchable/Touchable';
import NotificationCount from '../notification-count/NotificationCount';
import MessageStatusIcon from '../message-status/MessageStatusIcon';
import { Chat } from '../../../lib/types/chat/chatType';
import { Screens } from '../../../navigators/main/MainParamList';
import { useMainNavigation } from '../../../lib/hooks/navigation/useNavigation';
import { $profile } from '../../../store/auth/profileStore';
import { useStore, useStoreMap } from 'effector-react';
import { setActiveChat } from '../../../store/chat/chat-detail/chatDetailStore';
import { $onlineUsers } from '../../../store/contacts/contactsStore';
import { getLastMessageStatus, getTextLastMessage } from '../../../lib/utils/chat/chatUtils';
import UserNameLastMessage from './UserNameLastMessage';
import { fromNow } from '../../../lib/utils';


interface ChatItemPropsType {
  item: Chat;
}

const ChatItem: FC<ChatItemPropsType> = ({ item }) => {
  const { navigate } = useMainNavigation();

  const chatItem = Object.assign({}, item); // important

  const onPressHandler = async () => {
    setActiveChat({
      id: chatItem.id,
      image: chatItem.image || '',
      title: chatItem.title,
      usersCount: chatItem.users_profile.length,
      private: chatItem.is_private,
    });
    navigate(Screens.MESSAGES, { id: chatItem.id });
  };

  const profile = useStore($profile);

  const isLastMessageMine = profile?.bitrix?.bitrix_id === chatItem.last_message?.bitrix_user?.bitrix_id;

  const isOnline = useStoreMap($onlineUsers, (onlineUsers) => {
    if (!chatItem.is_private) return false;
    const notMe = chatItem.users_profile.find((user) => user?.id !== profile?.id);
    return onlineUsers.some((onlineUser) => onlineUser?.bitrix?.bitrix_id === notMe?.id);
  });

  return (
    <Touchable
      onPress={ onPressHandler }
    >
      <View style={ styles.itemsContainer }>
        <Avatar
          isOnline={ isOnline }
          uri={ chatItem.image } />


        <View style={ styles.nameMessage }>
          <Span
            numberOfLines={1}
            style={ styles.name }>{ chatItem.title }</Span>
          <Span
            style={ styles.lastMessage }
            numberOfLines={ 1 }> { <UserNameLastMessage
              chatItem={chatItem}
              isLastMessageMine={isLastMessageMine}/> }
            { getTextLastMessage(chatItem?.last_message) }
          </Span>
        </View>

        <View style={ styles.messageCountTime }>
          <NotificationCount count={ chatItem.unread_messages } />

          <View style={ styles.messageTimeStatus }>
            {
              chatItem.last_message && isLastMessageMine &&
              <View style={ styles.status }>
                <MessageStatusIcon status={ getLastMessageStatus(chatItem.last_message) } />
              </View>
            }
            { chatItem.last_message && <Span>{ fromNow(chatItem.last_message.time, true, true)}</Span> }
          </View>

        </View>

      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  nameMessage: {
    marginLeft: 8,
    width: '100%',
    marginRight: 'auto',
  },
  name: {
    fontFamily: FONTS['700'],
    fontSize: 16,
    maxWidth: '75%',
  },
  lastMessage: {
    color: '#5E637A',
    width: '65%',
  },
  messageTimeStatus: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  status: {
    marginRight: 4,
  },
  time: {},
  messageCountTime: {
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
});

export default ChatItem;
