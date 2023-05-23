import { createEvent, createStore } from 'effector';
import { $chats } from '../chat/chatStore';


export interface UnreadCountType {
  messages: number,
  notifications: number
}

export const addUnreadMessageCount = createEvent<number>();
export const setUnreadMessageCount = createEvent<number>();
export const removeUnreadMessageCount = createEvent();
export const addUnreadNotificationCount = createEvent<number>();
export const clearUnreadCountStore = createEvent();

export const $unreadCount = createStore<UnreadCountType>({ messages: 0, notifications: 0 })
    .on(addUnreadMessageCount, ((state, count) => ({ ...state, messages: state.messages + count })))
    .on(setUnreadMessageCount, ((state, count) => ({ ...state, messages: count })))
    .on(removeUnreadMessageCount, ((state) => ({ ...state, messages: 0 })))
    .on(addUnreadNotificationCount, ((state, count) => ({ ...state, notifications: state.notifications + count })))
    .reset(clearUnreadCountStore);


$chats.watch((chats) => {
  const unreadMessages = chats?.chats?.reduce((count, chat) => count + chat.unread_messages, 0);
  setUnreadMessageCount(unreadMessages);
});
