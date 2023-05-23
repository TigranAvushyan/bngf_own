import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { PageType } from '../../lib/types';
import { http_get } from '../../lib/server/http';
import { $chats, addLastMessage, removeChat, setLastMessageStatus } from '../chat/chatStore';
import { Message, MessageStatus } from '../../lib/types/chat/chatType';
import {
  loadNextMessagesHandler,
  setMessageStatusAndIdHandler,
  setMessageStatusHandler,
  unshiftMessageActionToStore,
  unshiftMessageToStore,
} from '../../lib/utils/message/messageUtils';
import { deleteMessageHandler, editMessageHandler } from '../../lib/utils/message/messageBackdropUtil';
import { deleteMessage, editMessage } from './messageBackdropStore';


export interface NewMessageType {
  chatId: number,
  message: Message
}

export type MessageType = 'Action' | 'Message'

export interface NewMessageActionType {
  chatId: number,
  message: {
    time: string,
    text: string,
    type: MessageType,
  }
}


export interface MessagesStore {
  messages: Message[],
  chat_id: number,
  next: string | null,
  count: number
}

export interface FirstMessageFx {
  id: number,
}

export interface SetMessageStatusAndIdProps {
  chatId: number,
  time_send: string,
  messageId: number
}

export interface SetMessageStatusProps {
  chatId: number,
  messageIds: number[],
  status: MessageStatus
}

export interface ActiveMessageType {
  chatId: number,
  messageItem: Message
}

export interface EditMessage {
  messageData: ActiveMessageType | null,
  text: string
}


export const getFirstMessagesFx = createEffect(async ({ id }: FirstMessageFx) => {
  const url = `chat/${ id }/`;
  const res: PageType<any> = await http_get(url);
  const messages = res.results;

  return {
    chat_id: id,
    messages: messages.map((i) => ({ ...i, status: i.users_read.length > 0 ? 'read' : 'sent' })),
    next: res.next,
    count: res.count,
  };
});

export const addMessageEv = createEvent<NewMessageType>();
export const addMessageAction = createEvent<NewMessageActionType>();

sample({
  clock: addMessageEv,
  fn: (newMessage) => ({
    chat_id: newMessage.chatId,
    last_message: {
      time: newMessage.message.time_send,
      ...newMessage.message,
    },
  }),
  target: addLastMessage,
});


sample({
  clock: addMessageAction,
  fn: (newMessageAction) => ({
    chat_id: newMessageAction.chatId,
    last_message: {
      id: Date.now(),
      time: newMessageAction.message.time,
      text: newMessageAction.message.text,
    },
  }),
  target: addLastMessage,
});

const getNextMessagesFx = createEffect(async ({ chatId, url }: { chatId: number, url: string }) => {
  const res = await http_get<PageType<any>>(url, {
    baseURL: '',
  });
  const messages = res.results;
  return {
    chat_id: chatId,
    messages,
    next: res.next,
  };
});

export const setMessageStatusAndId = createEvent<SetMessageStatusAndIdProps>();
export const setMessageStatus = createEvent<SetMessageStatusProps>();
export const clearMessagesStore = createEvent();


export const $messages = createStore<MessagesStore[]>([])
    .on(getFirstMessagesFx.done, (state, messages: any) => [...state, messages.result])
    .on(removeChat, (state, id) => state.filter((i) => i.chat_id !== id))
    .on(addMessageEv, unshiftMessageToStore)
    .on(getNextMessagesFx.done, loadNextMessagesHandler)
    .on(addMessageAction, unshiftMessageActionToStore)
    .on(setMessageStatus, setMessageStatusHandler)
    .on(setMessageStatusAndId, setMessageStatusAndIdHandler)
    .on(deleteMessage, deleteMessageHandler)
    .on(editMessage, editMessageHandler)
    .reset(clearMessagesStore);


export const getNextMessagesWrapperFx = attach({
  source: $messages,
  effect: getNextMessagesFx,
  mapParams: (chatId: number, messages: MessagesStore[]) => {
    const message = messages.find((i) => i.chat_id === chatId);
    return {
      chatId,
      url: message?.next || '',
    };
  },
});

sample({
  clock: setMessageStatus,
  source: $chats,
  fn: (_, payload) => payload,
  target: setLastMessageStatus,
});

