import React, { FC } from 'react';
import { Chat } from '../../../lib/types/chat/chatType';
import Span from '../span/Span';
import { FONTS } from '../../../style/global.style';

interface UserNameLastMessageProps {
  chatItem: Chat,
  isLastMessageMine: boolean,
}

const UserNameLastMessage: FC<UserNameLastMessageProps> = ({ chatItem, isLastMessageMine }) => {
  const userLastMessage = chatItem.last_message?.bitrix_user;
  if (isLastMessageMine) {
    return (
      <Span style={{ fontFamily: FONTS[700] }}>
        {'Вы: '}
      </Span>
    );
  }
  return (
    <>
      {!chatItem.is_private &&
        <Span
          style={{ fontFamily: FONTS[700] }}>
          {userLastMessage?.first_name ? `${userLastMessage?.first_name}: ` : null}
        </Span>
      }
    </>


  );
};

export default UserNameLastMessage;
