import React from 'react';
import { Pressable } from 'react-native';
import RoundedArrowIcon from '../../ui/icons/arrows/RoundedArrowIcon';
import Span from '../../ui/span/Span';
import { messageBackdropItemsStyle as styles } from './messageBackdropItemsStyle';
import { setVisibleReplyMessageQuote } from '../../../store/message/messageBackdropStore';
import { hideMessageBackdrop } from '../../../store/ui/backdrop/backdrop';


const MessageReply = () => {
  const setVisibleQuote = () => {
    setVisibleReplyMessageQuote(true);
    hideMessageBackdrop();
  };

  return (
    <>
      <Pressable style={ styles.action } onPress={setVisibleQuote}>
        <RoundedArrowIcon />
        <Span style={ styles.actionText }>Ответить</Span>
      </Pressable>
    </>
  );
};

export default MessageReply;
