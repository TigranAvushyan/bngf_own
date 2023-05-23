import { $profile } from '../../../store/auth/profileStore';
import { Message, MessageStatus } from '../../types/chat/chatType';
import {
  ActiveMessageType,
  MessagesStore, NewMessageActionType,
  SetMessageStatusAndIdProps,
  SetMessageStatusProps,
} from '../../../store/message/messagesStore';
import produce from 'immer';
import { $emptyMessage } from '../../../store/message/emptyMessageStore';


export const unshiftMessageToStore = (store: MessagesStore[], newMessage: { chatId: number, message: Message }): MessagesStore[] => {
  return produce(store, (draft) => {
    draft.forEach((item: MessagesStore) => {
      if (item.chat_id === newMessage.chatId) {
        item.messages.unshift(newMessage.message);
      }
    });
  });
};

export const unshiftMessageActionToStore = (store: MessagesStore[], newMessage: NewMessageActionType): MessagesStore[] => {
  const emptyMessage = $emptyMessage.getState();
  return produce(store, (draft) => {
    draft.forEach((item: MessagesStore) => {
      if (item.chat_id === newMessage.chatId && emptyMessage) {
        item.messages.unshift({ ...emptyMessage, text: newMessage.message.text, type: newMessage.message.type, time_send: newMessage.message.time });
      }
    });
  });
};

export const getMyMessageStatus = (users_read: number[], sentUserId: number): MessageStatus => {
  const profile = $profile.getState();

  const isMessageMine = sentUserId === profile?.id;

  if (isMessageMine) return users_read.length ? 'read' : 'sent';

  return 'sending';
};


export const loadNextMessagesHandler = (store: MessagesStore[], payload: any) => {
  return store.map((i) => {
    if (i.chat_id === payload.result.chat_id) {
      i.messages.push(...payload.result.messages);
      i.next = payload.result.next;
    }
    return i;
  });
};


export const setMessageStatusAndIdHandler = (store: MessagesStore[], payload: SetMessageStatusAndIdProps): MessagesStore[] => {
  return produce(store, (draft) => {
    draft.forEach((chat) => {
      if (chat.chat_id === payload.chatId) {
        chat.messages.forEach((message) => {
          const isTimeSendEqual = new Date(message.time_send).toString() === new Date(payload.time_send).toString();
          if (isTimeSendEqual) {
            message.id = payload.messageId;
            message.status = 'sent';
            return;
          }
        });
      }
    });
  });
};

export const setMessageStatusHandler = (store: MessagesStore[], payload: SetMessageStatusProps): MessagesStore[] => {
  return produce(store, (draft) => {
    draft.forEach((chat) => {
      if (chat.chat_id === payload.chatId) {
        chat.messages.forEach((message) => {
          payload.messageIds.forEach((messageId) => {
            if (messageId === message.id) {
              message.status = payload.status;
            }
          });
        });
        return;
      }
    });
  });
};

export const getTextActiveMessage = (activeMessage: ActiveMessageType | null) => {
  if (!activeMessage) return '';
  const { messageItem } = activeMessage;
  if (messageItem.text) return messageItem.text;
  if (messageItem.parents) return messageItem.parents[0].text;
};
