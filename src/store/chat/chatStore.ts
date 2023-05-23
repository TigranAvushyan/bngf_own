import { createEffect, createEvent, createStore, restore, sample } from 'effector';
import { http_get } from '../../lib/server/http';
import {
  addLastMessageHandler,
  addNewChatHandler,
  getNextChatsHandler,
  mapResponseChatsToStore,
  removeChatHandler,
  removeMessagesHandler,
  setLastMessageStatusHandler,
  upChatInListHandler,
  updateChatImageAndTitleHandler,
  updateChatListHandler,
  updateUsersInChatHandler,
} from '../../lib/utils/chat/chatUtils';
import { Chat, ChatsLastMessageType, ChatsType, HttpChat, UpdateUsers } from '../../lib/types/chat/chatType';
import { PageType } from '../../lib/types';
import { UpdateChatImageTitle } from './chat-detail/chatDetailStore';
import { SetMessageStatusProps } from '../message/messagesStore';
import { urls } from '../../lib/server/urls';

export const CHAT_PORTION_LIMIT = 20;

export const fetchChats = createEffect(async () => {
  try {
    setIsLoadingChats(true);
    const url = urls.chats();
    const res: PageType<HttpChat> = await http_get(url);
    setIsLoadingChats(false);
    const chats = res.results;
    return {
      chats: mapResponseChatsToStore(chats),
      next: res.next,
      count: res.count,
    };
  } catch (e) {
    console.log('fetchChats: ', e.message);
  } finally {
    setIsLoadingChats(false);
  }
});

export const getNextChats = createEffect(async (url: string) => {
  const res = await http_get<PageType<any>>(url, {
    baseURL: '',
  });
  const chats = res.results;
  return {
    chats: mapResponseChatsToStore(chats),
    next: res.next,
    count: res.count,
  };
});

const updateChatList = createEffect(async () => {
  try {
    const url = urls.chats();
    const res: PageType<HttpChat> = await http_get(url);
    const chats = res.results;
    return {
      chats: mapResponseChatsToStore(chats),
      next: res.next,
      count: res.count,
    };
  } catch (e) {
    console.log('updateChatList: ', e.message);
  }
});


export const addLastMessage = createEvent<ChatsLastMessageType>();

export const addNewChat = createEvent<Chat>();
export const removeChat = createEvent<number>();
export const removeUnreadMessagesCount = createEvent<number>();
export const updateChatTitleAndImage = createEvent<UpdateChatImageTitle>();
export const updateUsersInChat = createEvent<UpdateUsers>();
export const setLastMessageStatus = createEvent<SetMessageStatusProps>();
export const clearChatStore = createEvent();
export const upChatInList = createEvent<number>();

export const $chats = createStore<ChatsType>({ chats: [], count: 0, next: '' })
    .on(fetchChats.done, (_, payload: any) => payload.result)
    .on(getNextChats.done, getNextChatsHandler)
    .on(updateChatList.done, updateChatListHandler)
    .on(addNewChat, addNewChatHandler)
    .on(addLastMessage, addLastMessageHandler)
    .on(removeChat, removeChatHandler)
    .on(removeUnreadMessagesCount, removeMessagesHandler)
    .on(updateUsersInChat, updateUsersInChatHandler)
    .on(updateChatTitleAndImage, updateChatImageAndTitleHandler)
    .on(upChatInList, upChatInListHandler)
    .on(setLastMessageStatus, setLastMessageStatusHandler)
    .reset(clearChatStore);

export const setIsLoadingChats = createEvent<boolean>();

export const $isLoadingChats = restore(setIsLoadingChats, false);

sample({
  clock: upChatInList,
  source: $chats,
  filter: (source, chatId) => !source.chats.some((chatItem) => chatItem.id === chatId),
  fn: (store, chatId) => {
    const totalCountChats = store.count;
    const currentCountChats = store.chats.length;

    return { totalCountChats, currentCountChats, chatId };
  },
  target: updateChatList,
});

