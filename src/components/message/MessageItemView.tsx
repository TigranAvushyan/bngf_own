import React, { FC, useMemo } from 'react';
import Avatar from '../ui/avatar/Avatar';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import Span from '../ui/span/Span';
import { containerStyle, sideStyle } from '../../lib/utils/ui/message/messageUtils';
import { FONTS } from '../../style/global.style';
import { useStore } from 'effector-react';
import { $profile } from '../../store/auth/profileStore';
import ChatImage, { ImageData } from '../chat/chat-media/ChatImage';
import moment from 'moment';
import MessageStatusIcon from '../ui/message-status/MessageStatusIcon';
import ChatFile from '../chat/chat-file/ChatFile';
import MessageAudio from '../chat/chat-audio/MessageAudio';
import { getUserFromStore } from '../../store/contacts/contactsStore';
import { Screens } from '../../navigators/main/MainParamList';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import { Message } from '../../lib/types/chat/chatType';
import QuotedMessage from '../ui/message/QuotedMessage';
import { fetchPrivateChatDetail } from '../../store/chat/chat-detail/chatDetailStore';
import MessageItemAction from '../ui/message/MessageItemAction';
import { getFullName } from '../../lib/utils';


interface MessageItemView {
  messageItem: Message
}

const MessageItemView: FC<MessageItemView> = ({ messageItem }) => {
  const profile = useStore($profile);
  const messageSide = useMemo(() => messageItem?.bitrix_user?.bitrix_id === profile?.bitrix?.bitrix_id ? 'right' : 'left', [profile, messageItem]);

  const { navigate } = useMainNavigation();

  const onPressAvatar = async () => {
    if (messageItem?.bitrix_user?.bitrix_id === profile?.bitrix?.bitrix_id) return;
    const user = await getUserFromStore(messageItem.bitrix_user.bitrix_id);
    fetchPrivateChatDetail(user);
    navigate(Screens.CHAT_DETAILS);
  };

  if (messageItem.type === 'Action') {
    return <MessageItemAction text={messageItem.text}/>;
  }

  const images = messageItem.media.map((image) => ({
    url: image.image,
    sentUserName: getFullName(messageItem.bitrix_user.first_name, messageItem.bitrix_user.last_name),
    date: messageItem.time_send,
  }));

  return (
    <>
      <View style={ [styles.itemContainer, containerStyle(messageSide)] }>

        <Pressable onPress={ onPressAvatar }>
          <Avatar size={ 32 } uri={ messageItem?.bitrix_user?.avatar } />
        </Pressable>
        <View style={ [styles.message, sideStyle(messageSide)] }>
          { messageSide === 'left' &&
            <Span
              style={ styles.name }>{ messageItem?.bitrix_user?.first_name } { messageItem?.bitrix_user?.last_name }</Span> }
          <View>
            { messageItem.parents?.length ? <QuotedMessage messageItem={messageItem?.parents[0]}/> : null}
          </View>
          <View>

            { messageItem.media.length ? <ChatImage pressable images={ images } /> : null }
            { messageItem.audio.length ? <MessageAudio audioURI={ messageItem.audio[0].audio } /> : null }
            { messageItem.file.length ? <ChatFile data={ messageItem.file } /> : null }
            { messageItem.text?.trim().length ? <Span style={ styles.text }>{ messageItem.text }</Span> : null }
          </View>
          <View style={ styles.statusTime }>
            {messageItem.changed && <Span style={{ fontSize: 10 }}>изм.</Span>}
            { messageSide === 'right' && <MessageStatusIcon status={ messageItem.status } /> }
            <Span style={ styles.time }>{ moment(messageItem.time_send).format('HH:mm') }</Span>
          </View>
        </View>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'flex-end',
    zIndex: 110,
  },
  message: {
    marginHorizontal: 4,
    maxWidth: '70%',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
  },
  name: {
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 12,
    color: '#17303F',
  },
  text: {
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
    color: '#17303F',
  },
  statusTime: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: FONTS['500'],
    fontSize: 10,
    color: '#5E637A',
    marginLeft: 3,
  },
});


export default MessageItemView;
