import React, { FC } from 'react';
import { MessageStatus } from '../../../lib/types/chat/chatType';
import MessageSentIcon from '../icons/message-status/MessageSentIcon';
import MessageReadIcon from '../icons/message-status/MessageReadIcon';
import MessageSendingIcon from '../icons/message-status/MessageSendingIcon';


interface MessageStatusIconPropsType {
  status: MessageStatus;
}


const MessageStatusIcon: FC<MessageStatusIconPropsType> = ({ status }) => {
  switch (status) {
    case 'sent':
      return <MessageSentIcon />;
    case 'read':
      return <MessageReadIcon />;
    case 'sending':
      return <MessageSendingIcon />;
  }
  return null;
};

export default MessageStatusIcon;
