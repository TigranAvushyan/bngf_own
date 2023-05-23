import React from 'react';
import { Pressable } from 'react-native';
import { messageBackdropItemsStyle as styles } from './messageBackdropItemsStyle';
import RoundedArrowIcon from '../../ui/icons/arrows/RoundedArrowIcon';
import Span from '../../ui/span/Span';
import { setVisibleForwardPopUP } from '../../../store/message/messageBackdropStore';
import { hideMessageBackdrop } from '../../../store/ui/backdrop/backdrop';

const MessageForward = () => {
  const setVisibleForwardPopUp = () => {
    setVisibleForwardPopUP(true);
    hideMessageBackdrop();
  };
  return (
    <Pressable style={ styles.action } onPress={setVisibleForwardPopUp}>
      <RoundedArrowIcon style={ { transform: [{ scaleX: -1 }] } } />
      <Span style={ styles.actionText }>Переслать</Span>
    </Pressable>
  );
};

export default MessageForward;
