import React from 'react';
import { Pressable } from 'react-native';
import { messageBackdropItemsStyle as styles } from './messageBackdropItemsStyle';
import TrashCase from '../../ui/icons/trash-case/TrashCase';
import Span from '../../ui/span/Span';
import { useStore } from 'effector-react';
import { hideMessageBackdrop } from '../../../store/ui/backdrop/backdrop';
import { $activeMessage, deleteMessage } from '../../../store/message/messageBackdropStore';


const MessageDeleteConfirm = () => {
  const activeMessage = useStore($activeMessage);
  const onDeleteMessage = () => {
    if (activeMessage) {
      deleteMessage(activeMessage);
    }
    hideMessageBackdrop();
  };

  return (
    <Pressable style={ styles.action } onPress={ onDeleteMessage }>
      <TrashCase color={ '#FF3742' } />
      <Span style={ [styles.actionText, { color: '#FF3742' }] }>Удалить у всех</Span>
    </Pressable>
  );
};

export default MessageDeleteConfirm;
