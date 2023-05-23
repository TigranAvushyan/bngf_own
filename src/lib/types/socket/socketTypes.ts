import { BitrixProfile } from '../user/userType';
import { AudioType, FileType, MediaType, Message } from '../chat/chatType';

export interface SocketMessageType {
  action: 'new_message',
  data: {
    message: {
      id: number,
      bitrix_user: BitrixProfile,
      media: MediaType[],
      file: FileType[],
      audio: AudioType[],
      text: string,
      time_send: string,
      time: string,
      type: 'Action' | 'Message',
      changed: boolean,
      bitrix_id: number,
      from_chat: number,
      parents?: Message[],
      users_read: number[],
      tags: string[]
    }
  }
}


export interface SocketNewChatCreated {
  action: 'new_chat_created',
  data: {
    chat: {
      admins_profile: number[],
      bitrix_id: number | null,
      bitrix_id_for_send: number | null,
      creator_profile: number,
      id: number,
      image: string | null,
      last_message: null,
      privat: boolean,
      time: string,
      title: string,
      users_profile: number[],
    },
  },
}

export interface SocketUserOnlineStatus {
  action: 'online_status',
  data: {
    is_online: false,
    user: 2,
  },
}

export interface SocketUserRemove {
  action: 'users_removed_from_chat',
  data: {
    users_id: number[],
    chat_id: number,
    admin_id: number
  }
}


export interface SocketNewUserInChat {
  action: 'new_user_in_chat',
  data: {
    chat: {
      id: number,
      image: string,
      title: string,
      privat: boolean,
      bitrix_id: number | null,
      bitrix_id_for_send: number | null,
      time: string,
      creator_profile: number,
      last_message: number,
      users_profile: number[],
      admins_profile: number[]
    }
  }
}


export interface SocketReadMessageStatus {
  action: 'read_messages_status',
  data: {
    messages_status: {
      ids: number[],
      user_read: number,
      from_chat: number
    }
  }
}

export interface SocketNewNews {
  action: 'add_news',
  data: {
    id: number,
    from_user: BitrixProfile,
    message: string,
    title: string,
    date: string
  }
}

export interface SocketChatUserAction {
  action: 'add_user' | 'remove_user',
  data: {
    admin_id: string,
    chat_id: string,
    time: string,
    users_id: string
  }
}
export interface SocketChatAdminAction {
  action: 'add_admin' | 'remove_admin',
  data: {
    admin_id: string,
    chat_id: string,
    time: string,
    admins_id: string
  }
}


export interface SocketUpdateChat {
  action: 'update_chat',
  data: {
    chat_id: string,
    image: string,
    title: string,
  }
}


export type SocketResponseType =
  SocketNewChatCreated
  | SocketChatAdminAction
  | SocketMessageType
  | SocketUserRemove
  | SocketNewUserInChat
  | SocketReadMessageStatus
  | SocketUpdateChat
  | SocketUserOnlineStatus
  | SocketNewNews
  | SocketChatUserAction
  | SocketChatAdminAction
