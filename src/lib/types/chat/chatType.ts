import { User } from '../user/userType';
import { MessageType } from '../../../store/message/messagesStore';
import { Time } from '../index';

export interface MediaType {
  image: string;
  file_size: string;
}

export interface FileType {
  file: string;
  file_size: number;
  file_name: string;
}

export interface AudioType {
  audio: string;
  file_size: string;
}

interface MessageUser {
  avatar: string,
  bitrix_id: number,
  first_name: string,
  id: number,
  last_name: string,
  middle_name?: string,
  mobile_phone?: string,
}

export type MessageStatus = 'sending' | 'sent' | 'read'

export interface Message {
  id: number,
  type: MessageType,
  bitrix_user: MessageUser,
  media: MediaType[],
  file: FileType[],
  audio: AudioType[],
  from_chat?: number,
  text: string | null,
  time_send: Time,
  changed: boolean,
  parents?: Message[],
  users_read: number[],
  status: MessageStatus,
}

export interface LastMessage {
  id: number,
  text: string | null,
  status?: MessageStatus,
  time: Time,
  users_read?: number[] | null,
  parents?: Message[],
  audio?: AudioType[],
  media?: MediaType[],
  file?: FileType[],
  bitrix_user?: MessageUser,
}

export interface ChatUserProfile {
  id: number,
  bitrix_id: number,
  user: {
    id: number,
    email: string,
    is_online: boolean
  }
}

export interface HttpChat {
  id: number,
  privat: boolean,
  bitrix_id_for_send: number,
  unread_messages_list: number[],
  title: string,
  image: string | null,
  users_profile: ChatUserProfile[],
  last_message: LastMessage | null,
  unread_messages: number,
  time: string
}

export interface Chat {
  id: number,
  is_private: boolean,
  bitrix_id_for_send: number,
  title: string,
  image?: string,
  users_profile: User[],
  last_message: LastMessage | null,
  unread_messages_list: number[],
  unread_messages: number
}

export interface UpdateUsers {
  chatId: number,
  users: User[]
}

export interface UnreadMessages {
  chatId: number,
  messageId: number
}

export interface ChatsLastMessageType {
  chat_id: number,
  last_message: LastMessage
}

export interface ChatsType {
  chats: Chat[],
  next: string,
  count: number
}
