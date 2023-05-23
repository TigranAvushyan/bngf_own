import { attach, combine, createEffect, createEvent, createStore, guard, restore, sample } from 'effector';
import { BitrixProfile, User } from '../../../lib/types/user/userType';
import { $profile } from '../../auth/profileStore';
import {
  addAdminsToChatDetailHandler,
  addChatDetailAudioToStore,
  addChatDetailFileHandler,
  addChatDetailFileToStore,
  addChatDetailInfoToStore,
  addChatDetailMediaToStore,
  addNewChatDetailHandler,
  addUsersToChatDetailHandler,
  removeAdminFromChatDetailHandler,
  removeUserFromChatDetailHandler,
  setChatImageAndTitleHandler,
  setChatNotificationSettingsHandler,
} from '../../../lib/utils/chat/chat-detail/chatDetailUtils';
import { http_get, http_put } from '../../../lib/server/http';
import { removeChat, updateUsersInChat } from '../chatStore';
import { emptyPage, PageType } from '../../../lib/types';
import { getChatDetailAudio, getChatDetailFile, getChatDetailInfo, getChatDetailMedia } from './chatDetailStoreEvents';
import { getFileObject, getFullName } from '../../../lib/utils';
import {
  addAdminToChatHttp,
  addUserToChatHttp,
  removeAdminFromChatHttp,
  removeUserFromChatHttp,
} from './chatDetailsHttpFx';
import { NotificationSettings } from '../../../lib/types/settings/settingsTypes';
import { urls } from '../../../lib/server/urls';


export interface FileType {
  file_size: number;
  file_created: string;
  file_type: string;
  file_name: string;
  content_object: ContentObjectFileType;
}

export interface ContentObjectFileType {
  bitrix_user: BitrixProfile;
}

export interface ChatDetailMedia extends Partial<FileType> {
  image: string;
}

export interface ChatDetailFile extends Partial<FileType> {
  file: string;
}

export interface ChatDetailAudio extends Partial<FileType> {
  audio: string;
}


export interface ChatDetailInfo {
  id: number,
  title: string,
  privat: boolean,
  image?: string,
  notifications: NotificationSettings,
  users_profile: BitrixProfile[],
  admins_profile: BitrixProfile[],
  creator_profile: BitrixProfile,
}

export interface ChatDetailStore extends ChatDetailInfo {
  media: PageType<ChatDetailMedia>,
  file: PageType<ChatDetailFile>,
  audio: PageType<ChatDetailAudio>,
}

export interface AddChatDetailFile {
  chatId: number,
  data: {
    media: ChatDetailMedia[],
    file: ChatDetailFile[],
    audio: ChatDetailAudio[],
  }
}

export type ChatId = { chatId: number }

export interface ChatAddUser {
  chatId: number,
  users: BitrixProfile[]
}

export interface ChatRemoveUser {
  chatId: number,
  usersId: number[]
}

export interface ImageTitle {
  title?: string,
  image?: string
}

export type UpdateChatImageTitle = ImageTitle & ChatId
export type ChatNotificationSettings = NotificationSettings & ChatId


export const chatLogout = createEffect(async (chatId: number) => {
  try {
    const url = urls.chatLogout(chatId);
    await http_get(url);
    removeChatDetail(chatId);
    removeChat(chatId);
    return chatId;
  } catch (e) {
    console.log('chatLogout: ', e);
  }
});
export const setChatImageAndTitle = createEvent<UpdateChatImageTitle>();

export const addNewChatDetail = createEvent<ChatDetailStore>();
export const setCurrentChatDetail = createEvent<number>();

export const setActiveChat = createEvent<ActiveChat | null>();
export const $activeChat = restore(setActiveChat, null)
    .on(removeUserFromChatHttp.done, (state) => state && ({ ...state, usersCount: state.usersCount -1 }))
    .on(addUserToChatHttp.done, (state, { result }) => state &&
      ({ ...state, usersCount: result.users.length + state.usersCount }))
    .on(setChatImageAndTitle, (state, payload) => ({
      title: payload.title || '',
      image: payload.image || '',
      id: payload.chatId,
      usersCount: state?.usersCount || 0,
      private: state?.private || false,
    }));

export const setActivePrivateChat = createEvent<ActiveChat | null>();
export const $activePrivateChat = restore(setActivePrivateChat, null);


export interface ActiveChat {
  id: number,
  usersCount: number,
  title: string,
  image: string,
  private: boolean
}

export const fetchPrivateChatDetail = (user?: User) => {
  if (!user) return;
  const activeChat: ActiveChat = {
    id: user.chat_user || 0,
    title: getFullName(user.first_name, user.last_name),
    image: user.avatar,
    usersCount: 2,
    private: true,
  };

  if (user.chat_user) {
    setActivePrivateChat(activeChat);
    return;
  }

  const id = user.bitrix.bitrix_id * -1 + 1;
  addNewChatDetail({
    id,
    title: user.first_name + user.last_name,
    privat: true,
    image: user.avatar,
    admins_profile: [user.bitrix],
    creator_profile: user.bitrix,
    users_profile: [user.bitrix],
    notifications: {
      enabled: true,
      disableEnd: null,
    },
    media: emptyPage,
    file: emptyPage,
    audio: emptyPage,
  });
  setActivePrivateChat({ ...activeChat, id });
};


// update title and image
export const updateChatImageAndTitleHttp = attach({
  source: $activeChat,
  mapParams: (params: ImageTitle, activeChat) => ({ chatId: activeChat?.id || 0, ...params }),
  effect: createEffect(async ({ chatId, image, title }: UpdateChatImageTitle) => {
    try {
      const formDate = new FormData();
      // @ts-ignore
      if (image) formDate.append('image', getFileObject(image));
      if (title) formDate.append('title', title);
      const url = urls.chatDetail(chatId);
      await http_put(url, formDate);
    } catch (e) {
      console.log('updateChatImageAndTitleHttp: ', e.message);
    }
  }),
});

export const removeUserFromChat = attach({
  source: $activeChat,
  mapParams: (usersId: number[], s) => ({ chatId: s?.id || 0, usersId }),
  effect: removeUserFromChatHttp,
});


export const removeAdminFromChat = attach({
  source: $activeChat,
  mapParams: (usersId: number[], activeChat) => ({ chatId: activeChat?.id || 0, usersId }),
  effect: removeAdminFromChatHttp,
});


export const addAdminToChat = attach({
  source: $activeChat,
  mapParams: (users: BitrixProfile[], activeChat) => ({ chatId: activeChat?.id || 0, users }),
  effect: addAdminToChatHttp,
});


export const addUserToChat = attach({
  source: $activeChat,
  mapParams: (users: BitrixProfile[], activeChat) => ({ chatId: activeChat?.id || 0, users }),
  effect: addUserToChatHttp,
});


export const addChatDetailFile = createEvent<AddChatDetailFile>();
export const setChatNotificationSettings = createEvent<ChatNotificationSettings>();
export const clearChatDetailsStore = createEvent();

const removeChatDetail = createEvent<number>();
export const removeUserFromChatDetail = createEvent<ChatRemoveUser>();
export const removeAdminFromChatDetail = createEvent<ChatRemoveUser>();
export const addUserToChatDetail = createEvent<ChatAddUser>();
export const addAdminToChatDetail = createEvent<ChatAddUser>();

export const $chatDetails = createStore<ChatDetailStore[]>([])
    .on(addChatDetailFile, addChatDetailFileHandler)
    .on(setChatImageAndTitle, setChatImageAndTitleHandler)
    .on(addNewChatDetail, addNewChatDetailHandler)
    .on(setChatNotificationSettings, setChatNotificationSettingsHandler)
    .on(removeUserFromChatDetail, removeUserFromChatDetailHandler)
    .on(removeAdminFromChatDetail, removeAdminFromChatDetailHandler)
    .on(addUserToChatDetail, addUsersToChatDetailHandler)
    .on(addAdminToChatDetail, addAdminsToChatDetailHandler)
    .on(getChatDetailMedia.done, (store, { result }) => addChatDetailMediaToStore(store, result))
    .on(getChatDetailFile.done, (store, { result }) => addChatDetailFileToStore(store, result))
    .on(getChatDetailAudio.done, (store, { result }) => addChatDetailAudioToStore(store, result))
    .on(getChatDetailInfo.done, (store, { result }) => addChatDetailInfoToStore(store, result))
    .on(removeChatDetail, (state, id) => state.filter((i) => id !== i.id))
    .reset(clearChatDetailsStore);


const getChatDetail = createEvent();


guard({
  source: $chatDetails,
  clock: setActiveChat,
  filter: (chats, activeChat) => !chats.some((chat) => chat.id === activeChat?.id),
  target: getChatDetail,
});

guard({
  source: $chatDetails,
  clock: setActivePrivateChat,
  filter: (chats, activePrivateChat) => activePrivateChat !== null && !chats.some((chat) => chat.id === activePrivateChat?.id),
  target: getChatDetail,
});


sample({
  clock: getChatDetail,
  source: [$activePrivateChat, $activeChat],
  fn: (source) => ({ chatId: source[0]?.id || source[1]?.id || 0 }),
  target: [getChatDetailMedia, getChatDetailFile, getChatDetailAudio, getChatDetailInfo],
});


export const $currentChatDetail = combine(
    $chatDetails,
    $activeChat,
    $activePrivateChat,
    (chatDetail, activeChat, activePrivateChat) => {
      console.log('activePrivateChat2: ', activePrivateChat);
      const id = activePrivateChat?.id || activeChat?.id || 0;
      return chatDetail.find((cd) => cd.id === id) || null;
    },
);

$currentChatDetail.watch((i) => {
  console.log('currentChatDetail: ', i);
});

sample({
  // @ts-ignore
  source: $currentChatDetail,
  fn: (store: ChatDetailStore | null) => ({
    chatId: store?.id,
    users: store?.users_profile,
  }),
  target: updateUsersInChat,
});


export const $amIAdminOnCurrentChat = combine(
    $profile,
    $currentChatDetail,
    (me, chatDetail) => chatDetail?.creator_profile?.bitrix_id === me?.bitrix?.bitrix_id || !!chatDetail?.admins_profile?.find((i) => i.bitrix_id === me?.bitrix?.bitrix_id),
);
