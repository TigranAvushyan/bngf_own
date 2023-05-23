import {
  AddChatDetailFile,
  ChatAddUser,
  ChatDetailAudio,
  ChatDetailFile,
  ChatDetailInfo,
  ChatDetailMedia,
  ChatDetailStore,
  ChatNotificationSettings,
  ChatRemoveUser,
  UpdateChatImageTitle,
} from '../../../../store/chat/chat-detail/chatDetailStore';
import produce from 'immer';
import { emptyPage, PageType } from '../../../types';
import _ from 'lodash';


export const removeUserFromChatDetailHandler = (store: ChatDetailStore[], payload: ChatRemoveUser) => {
  const { usersId, chatId } = payload;
  return produce(store, (draft) => {
    draft.forEach((chat) => {
      if (chatId === chat.id) {
        _.remove(chat.users_profile, (user) => usersId.indexOf(user.bitrix_id) >= 0);
        _.remove(chat.admins_profile, (user) => usersId.indexOf(user.bitrix_id) >= 0);
      }
    });
  });
};

export const removeAdminFromChatDetailHandler = (store: ChatDetailStore[], payload: ChatRemoveUser) => {
  const { usersId, chatId } = payload;
  return produce(store, (draft) => {
    draft.forEach((chat) => {
      if (chatId === chat.id) {
        _.remove(chat.admins_profile, (user) => usersId.indexOf(user.bitrix_id) >= 0);
      }
    });
  });
};


export const addUsersToChatDetailHandler = (store: ChatDetailStore[], payload: ChatAddUser) => {
  const { users, chatId } = payload;
  return produce(store, (draft) => {
    draft.forEach((chat) => {
      if (chat.id === chatId) {
        chat.users_profile.push(...users);
      }
    });
  });
};


export const addAdminsToChatDetailHandler = (store: ChatDetailStore[], payload: ChatAddUser) => {
  const { users, chatId } = payload;
  return produce(store, (draft) => {
    draft.forEach((chat) => {
      if (chat.id === chatId) {
        chat.admins_profile.push(...users);
      }
    });
  });
};

export const addChatDetailFileHandler = (store: ChatDetailStore[], payload: AddChatDetailFile): ChatDetailStore[] => {
  return produce(store, (draft) => {
    draft.map((i) => {
      if (i.id === payload.chatId) {
        i.media.results.push(...payload.data.media);
        i.file.results.push(...payload.data.file);
        i.audio.results.push(...payload.data.audio);
      }
      return i;
    });
  });
};


export const addChatDetailMediaToStore = (store: ChatDetailStore[], {
  media,
  chatId,
}: { media: PageType<ChatDetailMedia>, chatId: number }) => {
  return produce(store, (draft) => {
    draft.forEach((chats) => {
      if (chats.id === chatId) {
        chats.media.next = media.next;
        chats.media.count = media.count;
        chats.media.previous = media.previous;
        chats.media.results.push(...media.results);
      }
    });
  });
};

export const addChatDetailFileToStore = (store: ChatDetailStore[], {
  file,
  chatId,
}: { file: PageType<ChatDetailFile>, chatId: number }) => {
  return produce(store, (draft) => {
    draft.forEach((chats) => {
      if (chats.id === chatId) {
        chats.file.next = file.next;
        chats.file.count = file.count;
        chats.file.previous = file.previous;
        chats.file.results.push(...file.results);
      }
    });
  });
};

export const addChatDetailAudioToStore = (store: ChatDetailStore[], {
  audio,
  chatId,
}: { audio: PageType<ChatDetailAudio>, chatId: number }) => {
  return produce(store, (draft) => {
    draft.forEach((chats) => {
      if (chats.id === chatId) {
        chats.audio.next = audio.next;
        chats.audio.count = audio.count;
        chats.audio.previous = audio.previous;
        chats.audio.results.push(...audio.results);
      }
    });
  });
};

export const addChatDetailInfoToStore = (store: ChatDetailStore[], {
  info,
  chatId,
}: { info: ChatDetailInfo, chatId: number }) => {
  return produce(store, (draft) => {
    const chat = draft.find((i) => i.id === chatId);
    if (!chat) {
      draft.push({ ...info, media: emptyPage, audio: emptyPage, file: emptyPage });
    }
  });
};


export const setChatImageAndTitleHandler = (store: ChatDetailStore[], payload: UpdateChatImageTitle) => {
  const { title, image, chatId } = payload;
  return produce(store, (draft) => {
    const chat = draft.find((i) => i.id === chatId);
    if (chat) {
      chat.image = image;
      chat.title = title || '';
    }
  });
};

export const addNewChatDetailHandler = (store: ChatDetailStore[], payload: ChatDetailStore) => {
  return produce(store, (draft) => {
    draft.push(payload);
  });
};

export const setChatNotificationSettingsHandler = (store: ChatDetailStore[], payload: ChatNotificationSettings) => {
  const { chatId, disableEnd, enabled } = payload;
  return produce(store, (draft) => {
    draft.forEach((chat) => {
      if (chat.id === chatId) {
        chat.notifications = { disableEnd, enabled };
      }
    });
  });
};
