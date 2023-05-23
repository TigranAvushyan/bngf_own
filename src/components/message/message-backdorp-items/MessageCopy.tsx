import React from 'react';
import { Pressable } from 'react-native';
import { messageBackdropItemsStyle as styles } from './messageBackdropItemsStyle';
import CopyIcon from '../../ui/icons/copy/CopyIcon';
import Span from '../../ui/span/Span';
import { useStore, useStoreMap } from 'effector-react';
import { $activeMessage, setActiveMessage } from '../../../store/message/messageBackdropStore';
import { hideMessageBackdrop } from '../../../store/ui/backdrop/backdrop';
import * as Clipboard from 'expo-clipboard';
import { ActiveMessageType } from '../../../store/message/messagesStore';
import { getTextActiveMessage } from '../../../lib/utils/message/messageUtils';

const MessageCopy = () => {
  const activeMessage = useStore($activeMessage);

  const text = getTextActiveMessage(activeMessage);

  if (!text ) {
    return null;
  }

  const copyMessage = () => {
    if (text) {
      Clipboard.setString(text);
      setActiveMessage(null);
      hideMessageBackdrop();
    }
  };

  return (
    <Pressable style={ styles.action } onPress={ copyMessage }>
      <CopyIcon />
      <Span style={ styles.actionText }>Скопировать</Span>
    </Pressable>
  );
};

export default MessageCopy;
