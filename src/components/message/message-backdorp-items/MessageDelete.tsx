import React, { Dispatch, FC, SetStateAction } from 'react';
import { Pressable } from 'react-native';
import { messageBackdropItemsStyle as styles } from './messageBackdropItemsStyle';
import TrashCase from '../../ui/icons/trash-case/TrashCase';
import Span from '../../ui/span/Span';
import { useStore } from 'effector-react';
import { $profile } from '../../../store/auth/profileStore';
import { $activeMessage } from '../../../store/message/messageBackdropStore';
import { colors } from '../../../style/colors';

interface MessageDeleteProps {
  setVisibleDeleteConfirm: Dispatch<SetStateAction<boolean>>;
}

const MessageDelete: FC<MessageDeleteProps> = ({ setVisibleDeleteConfirm }) => {
  const activeMessage = useStore($activeMessage);
  const profile = useStore($profile);
  const isMyMessage = activeMessage?.messageItem?.bitrix_user?.bitrix_id === profile?.bitrix?.bitrix_id;
  const setActive = () => {
    setVisibleDeleteConfirm(true);
  };

  if (!isMyMessage) return null;

  return (
    <Pressable style={ styles.action } onPress={ setActive }>
      <TrashCase color={ colors.MESSAGE_DELETE_BUTTON } />
      <Span style={ [styles.actionText, { color: colors.MESSAGE_DELETE_BUTTON }] }>Удалить сообщение</Span>
    </Pressable>
  );
};

export default MessageDelete;
