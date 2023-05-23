import { $profile } from '../auth/profileStore';
import { Message } from '../../lib/types/chat/chatType';

export const $emptyMessage = $profile.map<Message | null>((i) => {
  if (i) {
    return {
      id: -1,
      file: [],
      text: null,
      changed: false,
      time_send: '',
      type: 'Message',
      status: 'sending',
      parents: [],
      audio: [],
      users_read: [],
      media: [],
      from_chat: 0,
      bitrix_user: {
        id: i.id,
        bitrix_id: i.bitrix.bitrix_id,
        avatar: i.avatar,
        first_name: i.first_name,
        last_name: i.last_name,
      },
    };
  }

  return null;
});
