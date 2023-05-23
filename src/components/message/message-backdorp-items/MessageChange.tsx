import React from 'react';
import { Pressable } from 'react-native';
import Span from '../../ui/span/Span';
import { messageBackdropItemsStyle as styles } from './messageBackdropItemsStyle';
import PenLineIcon from '../../ui/icons/pen/PenLineIcon';
import { $activeMessage, setVisibleEditMessageQuote } from '../../../store/message/messageBackdropStore';
import { hideMessageBackdrop } from '../../../store/ui/backdrop/backdrop';
import { useStore } from 'effector-react';
import { colors } from '../../../style/colors';
import { $profile } from '../../../store/auth/profileStore';

const MessageChange = () => {
  const messageItem = useStore($activeMessage);
  const text: string = messageItem?.messageItem.text || '';
  const profile = useStore($profile);
  const isMyMessage = messageItem?.messageItem?.bitrix_user?.bitrix_id === profile?.bitrix?.bitrix_id;

  const setVisibleQuote = () => {
    setVisibleEditMessageQuote(true);
    hideMessageBackdrop();
  };

  if (!isMyMessage || !text) return null;

  return (
    <Pressable style={ styles.action } onPress={setVisibleQuote}>
      <PenLineIcon color={ colors.PEN_LINE_ICON } width={ 12 } height={ 12 } />
      <Span style={ styles.actionText }>Изменить</Span>
    </Pressable>
  );
};

export default MessageChange;
