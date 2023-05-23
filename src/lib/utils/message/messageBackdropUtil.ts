import { ActiveMessageType, EditMessage, MessagesStore } from '../../../store/message/messagesStore';
import produce from 'immer';

export const deleteMessageHandler = (store: MessagesStore[], payload: ActiveMessageType) => {
  return produce(store, (draft) => {
    draft.forEach((i) => {
      if (i.chat_id === payload.chatId) {
        i.messages.forEach((message, idx) => {
          if (message.id === payload.messageItem.id) {
            i.messages.splice(idx, 1);
            return;
          }
        });
      }
    });
  });
};

export const editMessageHandler = (store: MessagesStore[], { messageData, text }: EditMessage) => {
  return produce(store, (draft) => {
    draft.forEach((i) => {
      if (i.chat_id !== messageData?.chatId) return;
      i.messages.forEach((message, idx) => {
        if (message.id !== messageData.messageItem.id) return;
        message.text = text;
        message.changed = true;
      });
    });
  });
};

export const getParents = (activeMessage:ActiveMessageType | null) => {
  if (!activeMessage) return [];
  const { messageItem } = activeMessage;
  if (messageItem?.parents?.length) return messageItem.parents;
  return [messageItem];
};
