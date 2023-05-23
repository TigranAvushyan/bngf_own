// remove user
import { createEffect } from 'effector';
import { http_put } from '../../../lib/server/http';
import { ChatAddUser, ChatRemoveUser } from './chatDetailStore';
import { urls } from '../../../lib/server/urls';

export const removeUserFromChatHttp = createEffect(async ({ chatId, usersId }: ChatRemoveUser) => {
  try {
    const url = urls.chatRemoveUsers(chatId);
    await http_put(url, { users_profile: usersId });
  } catch (e) {
    console.log('removeUserFromChatDetailHttp', e);
  }
  return { chatId, usersId };
});
// remove admin
export const removeAdminFromChatHttp = createEffect(async ({ chatId, usersId }: ChatRemoveUser) => {
  try {
    const url = urls.chatRemoveAdmins(chatId);
    await http_put(url, { admins_profile: usersId });
  } catch (e) {
    console.log('removeAdminFromChatDetailHttp', e);
  }
  return { chatId, usersId };
});
// add admin
export const addAdminToChatHttp = createEffect(async ({ chatId, users }: ChatAddUser) => {
  try {
    const url = urls.chatUpdateAdmins(chatId);
    await http_put(url, { admins_profile: users.map((i) => i.bitrix_id) });
  } catch (e) {
    console.log('addAdminToChatDetailHttp: ', e);
  }
  return { chatId, users };
});
// add user
export const addUserToChatHttp = createEffect(async ({ chatId, users }: ChatAddUser) => {
  try {
    const url = urls.chatUpdateUsers(chatId);
    await http_put(url, { users_profile: users.map((i) => i.bitrix_id) });
  } catch (e) {
    console.log('addUserToChatDetailHttp: ', e);
  }
  return { chatId, users };
});

