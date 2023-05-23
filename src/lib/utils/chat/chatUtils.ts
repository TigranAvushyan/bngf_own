import {
  Chat,
  ChatsLastMessageType,
  ChatsType,
  ChatUserProfile,
  HttpChat,
  LastMessage,
  MessageStatus,
  UpdateUsers,
} from '../../types/chat/chatType';
import { UpdateChatImageTitle } from '../../../store/chat/chat-detail/chatDetailStore';
import produce from 'immer';
import { Table } from '../../types';
import { SetMessageStatusProps } from '../../../store/message/messagesStore';

export const addLastMessageHandler = (state: ChatsType, payload: ChatsLastMessageType) => {
  // todo optimize
  return {
    ...state,
    chats: state.chats?.map((chatItem) => {
      if (chatItem.id === payload.chat_id) {
        return {
          ...chatItem,
          last_message: payload.last_message,
          unread_messages: chatItem.unread_messages + 1,
        };
      }
      return chatItem;
    }),
  };
};

export const removeMessagesHandler = (state: ChatsType, chatId: number) => {
  // todo optimize
  return {
    ...state,
    chats: state.chats?.map((messageObject) => {
      if (messageObject.id === chatId) {
        return { ...messageObject, unread_messages: 0 };
      }
      return messageObject;
    }),
  };
};

export const updateChatImageAndTitleHandler = (store: ChatsType, payload: UpdateChatImageTitle) => {
  const { title, image, chatId } = payload;
  return produce(store, (draft) => {
    const chat = draft.chats.find((i) => i.id === chatId);
    if (chat) {
      chat.image = image;
      chat.title = title || '';
    }
  });
};

export const updateUsersInChatHandler = (store: ChatsType, payload: UpdateUsers) => {
  return produce(store, (draft) => {
    const chat = draft.chats.find((i) => i.id === payload.chatId);
    if (chat) {
      chat.users_profile = payload.users;
    }
  });
};

export const getTextLastMessage = (lastMessage: LastMessage | null) => {
  if (lastMessage?.audio?.length) return 'Голосовое сообщение';
  if (lastMessage?.media?.length) return 'Фотография(ии)';
  if (lastMessage?.text) return lastMessage?.text;
  if (lastMessage?.parents?.length) return 'Пересланное сообщение';
  if (lastMessage?.file?.length) return lastMessage.file[0].file_name;
};

export const upChatInListHandler = (store: ChatsType, chatId: number) => {
  const index = store.chats.findIndex((chat) => chat.id === chatId);
  if (index <= 0) return store;
  const chat = store.chats.splice(index, 1);

  return {
    ...store,
    chats: [...chat, ...store.chats],
  };
};

export const updateChatListHandler = (store: ChatsType, payload: any) => {
  const { chatId } = payload.params;
  return upChatInListHandler(payload.result, chatId);
};

export const getNextChatsHandler = (store: ChatsType, payload: any) => {
  return produce(store, (draft) => {
    const table: Table = {};
    const uniqueChats = [...draft.chats, ...payload.result.chats].filter(({ id }) => (!table[id] && (table[id] = 1)));
    return {
      count: payload.result.count,
      next: payload.result.next,
      chats: uniqueChats,
    };
  });
};

export const mapResponseChatsToStore = (chats: HttpChat[]) => {
  return chats.map((chat: HttpChat) => ({
    ...chat,
    is_private: chat.privat,
    avatar: chat.image,
    users_profile: chat.users_profile.map((user: ChatUserProfile) => ({
      id: user.id,
      is_online: user?.user?.is_online,
    })),
  }));
};

export const removeChatHandler = (state: ChatsType, id: number) => {
  return {
    ...state,
    count: state.count - 1,
    chats: state.chats.filter((chatItem) => chatItem.id !== id),
  };
};

export const addNewChatHandler = (state: ChatsType, newChat: Chat) => {
  return {
    ...state,
    count: state.count + 1,
    chats: [newChat, ...state.chats],
  };
};

export const setLastMessageStatusHandler = (store: ChatsType, payload: SetMessageStatusProps): ChatsType => {
  return produce(store, (draft) => {
    const chat = draft.chats.find((chat) => chat.id === payload.chatId && chat.last_message);
    if (chat && chat.last_message) chat.last_message.status = payload.status;
  });
};

export const getLastMessageStatus = (latMessage: LastMessage):MessageStatus => {
  if (latMessage.status) return latMessage.status;
  if (latMessage.users_read?.length) return 'read';
  return 'sent';
};
