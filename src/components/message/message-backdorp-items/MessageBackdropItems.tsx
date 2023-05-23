import React, { useState } from 'react';
import MessageReply from './MessageReply';
import MessageChange from './MessageChange';
import MessageCopy from './MessageCopy';
import MessageForward from './MessageForward';
import MessageDelete from './MessageDelete';
import MessageDeleteConfirm from './MessageDeleteConfirm';

const MessageBackdropItems = () => {
  const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false);

  if (visibleDeleteConfirm) {
    return <MessageDeleteConfirm />;
  }

  return (
    <>
      <MessageReply />

      <MessageChange />

      <MessageCopy />

      <MessageForward />

      <MessageDelete setVisibleDeleteConfirm={setVisibleDeleteConfirm} />
    </>
  );
};


export default MessageBackdropItems;
