import {
  SocketChatAdminAction,
  SocketChatUserAction,
  SocketMessageType,
  SocketNewChatCreated,
  SocketNewNews,
  SocketReadMessageStatus,
  SocketUpdateChat,
  SocketUserOnlineStatus,
} from '../../types/socket/socketTypes';
import {
  addMessageAction,
  addMessageEv,
  setMessageStatus,
  setMessageStatusAndId,
} from '../../../store/message/messagesStore';
import { $profile, getMe } from '../../../store/auth/profileStore';
import {
  addAdminToChatDetail,
  addChatDetailFile,
  addUserToChatDetail,
  removeAdminFromChatDetail,
  removeUserFromChatDetail,
  setChatImageAndTitle,
  UpdateChatImageTitle,
} from '../../../store/chat/chat-detail/chatDetailStore';
import { addNewChat, upChatInList, updateChatTitleAndImage } from '../../../store/chat/chatStore';
import { addNews } from '../../../store/news/newsStore';
import { getUsersFromStoreByIds, setUserOnlineStatus } from '../../../store/contacts/contactsStore';
import { BASE_URL } from '../../server/urls';

export const newMessageRouter = (message: SocketMessageType) => {
  const messageData = message.data.message;
  const bitrixUser = messageData.bitrix_user;
  const profile = $profile.getState();
  const isMyMessage = bitrixUser.bitrix_id === profile?.bitrix.bitrix_id;
  const chatId = messageData.from_chat;

  const credits = {
    content_object: { bitrix_user: bitrixUser },
    file_created: messageData.time_send,
  };

  upChatInList(messageData.from_chat);

  addChatDetailFile({
    chatId,
    data: {
      audio: messageData.audio.map((i) => ({ audio: i.audio, ...credits })),
      media: messageData.media.map((i) => ({ image: i.image, ...credits })),
      file: messageData.file.map((i) => ({ file: i.file, file_name: i.file_name, file_size: i.file_size, ...credits })),
    },
  });

  if (isMyMessage) {
    setMessageStatusAndId({
      messageId: messageData.id,
      time_send: messageData.time_send,
      chatId,
    });

    setMessageStatus({
      status: 'sent',
      messageIds: [messageData.id],
      chatId: messageData.from_chat,
    });

    if (messageData.type !== 'Action') return;

    addMessageAction(
        {
          chatId: Number(messageData.from_chat),
          message: {
            text: messageData.text,
            type: 'Action',
            time: messageData.time,
          },
        },
    );
    return;
  }

  addMessageEv({
    chatId: chatId,
    message: {
      ...messageData,
      status: 'sent',
      type: 'Message',
      bitrix_user: {
        ...messageData.bitrix_user,
        id: bitrixUser.bitrix_id,
        avatar: BASE_URL + bitrixUser.avatar,
      },
    },
  });
};

export const newChatCreatedRouter = async (socketMessage: SocketNewChatCreated) => {
  const chat = socketMessage.data.chat;
  const users_profile = await getUsersFromStoreByIds(chat.users_profile);
  const me = await getMe();
  // @ts-ignore
  users_profile.push(me);
  addNewChat({
    id: chat.id,
    title: chat.title,
    is_private: chat.privat,
    image: chat.image || undefined,
    last_message: null,
    users_profile,
    unread_messages: 0,
    bitrix_id_for_send: 0,
    unread_messages_list: [],
  });
};

export const readMessagesStatusRouter = (socketMessage: SocketReadMessageStatus) => {
  setMessageStatus({
    status: 'read',
    messageIds: socketMessage.data.messages_status.ids,
    chatId: socketMessage.data.messages_status.from_chat,
  });
};

export const newNewsRouter = (socketMessage: SocketNewNews) => {
  const payload = socketMessage.data;
  addNews({
    id: payload.id,
    title: payload.title,
    detail_text: payload.message,
    from_bitrix_user: payload.from_user,
    time: payload.date,
  });
};

export const updateChatRouter = (socketMessage: SocketUpdateChat) => {
  const chatUpdate: UpdateChatImageTitle = {
    chatId: parseInt(socketMessage.data.chat_id),
    title: socketMessage.data.title,
    image: socketMessage.data.image,
  };
  setChatImageAndTitle(chatUpdate);
  updateChatTitleAndImage(chatUpdate);
};

export const removeUserFromChatRouter = (socketMessage: SocketChatUserAction) => {
  const usersId = JSON.parse(socketMessage.data.users_id);
  removeUserFromChatDetail({
    chatId: parseInt(socketMessage.data.chat_id),
    usersId,
  });
};

export const addUserToChatRouter = async (socketMessage: SocketChatUserAction) => {
  const usersId = JSON.parse(socketMessage.data.users_id);
  const users = await getUsersFromStoreByIds(usersId) || [];
  // @ts-ignore
  addUserToChatDetail({
    chatId: parseInt(socketMessage.data.chat_id),
    users,
  });
};

export const removeAdminFromChatRouter = (socketMessage: SocketChatAdminAction) => {
  const admins = JSON.parse(socketMessage.data.admins_id);
  removeAdminFromChatDetail({
    chatId: parseInt(socketMessage.data.chat_id),
    usersId: admins,
  });
};

export const addAdminToChatRouter = async (socketMessage: SocketChatAdminAction) => {
  const admins = JSON.parse(socketMessage.data.admins_id);
  const users = await getUsersFromStoreByIds(admins) || [];
  addAdminToChatDetail({
    chatId: parseInt(socketMessage.data.chat_id),
    users: users.map((u) => u.bitrix),
  });
};


export const onlineStatusRouter = (socketMessage: SocketUserOnlineStatus) => {
  setUserOnlineStatus({
    status: socketMessage.data.is_online,
    userId: socketMessage.data.user,
  });
};

