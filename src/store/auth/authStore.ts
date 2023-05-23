import { createEvent, createStore, sample } from 'effector';
import { clearProfileStore } from './profileStore';
import { clearChatStore } from '../chat/chatStore';
import { clearSelectedUsersStore } from '../chat/createChatStore';
import { clearSelectedChats } from '../chat/selectedChats';
import { clearChatDetailsStore } from '../chat/chat-detail/chatDetailStore';
import { clearUsersStore } from '../contacts/contactsStore';
import { clearMessagesStore } from '../message/messagesStore';
import { clearNotificationStore } from '../news/newsStore';
import { clearUnreadCountStore } from '../news/unreadNotificationStore';
import { enableNotification } from '../settings/settingsNotificationStore';

export const setAuth = createEvent<boolean>();
export const clearAuthStore = createEvent();


export const $isAuth = createStore(false)
    .on(setAuth, (_, payload) => payload)
    .reset(clearAuthStore);

export const clearAllStores = createEvent();

sample({
  clock: clearAllStores,
  target: [
    clearAuthStore,
    clearProfileStore,
    clearChatStore,
    clearSelectedUsersStore,
    clearSelectedChats,
    clearChatDetailsStore,
    clearUsersStore,
    clearMessagesStore,
    clearNotificationStore,
    clearUnreadCountStore,
    enableNotification,

  ],
});
