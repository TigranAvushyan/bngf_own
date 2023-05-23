import React from 'react';
import { setMessageBackdropProps, showMessageBackdrop } from '../../store/ui/backdrop/backdrop';
import MessageItemView from './MessageItemView';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { Message } from '../../lib/types/chat/chatType';
import { setActiveMessage } from '../../store/message/messageBackdropStore';


export interface MessageItemProps {
  messageItem: Message;
  chatId: number
}


const MessageItem = ({ messageItem, chatId }: MessageItemProps) => {
  const messageViewRef = React.useRef<View>(null);

  const onLongPressHandler = (e: GestureResponderEvent) => {
    e.stopPropagation();
    messageViewRef.current?.measureInWindow((_, y) => {
      setMessageBackdropProps({
        absoluteTop: y,
        messageItem,
      });
      showMessageBackdrop();
      setActiveMessage({
        messageItem: messageItem,
        chatId: chatId,
      });
    });
  };


  return (
    <Pressable
      delayLongPress={ 650 }
      onLongPress={ onLongPressHandler }
    >
      <View style={ { marginVertical: 6 } }>
        <Text ref={ messageViewRef } style={ { display: 'none' } } />
        <MessageItemView messageItem={ messageItem } />
      </View>
    </Pressable>
  );
};

export default MessageItem;
