export const REDIRECT_URL = 'https://bitrix-mobile.bngf.ru/oauth/bitrix/';
export const BASE_URL = 'https://bitrix-mobile.bngf.ru';
export const OAUTH_URL = 'https://bitrix-mobile.bngf.ru/backend/api/bitrix24/auth';
export const WEBSOCKET_URL = 'wss://bitrix-mobile.bngf.ru/ws/user/';

export const urls = {
  // news
  news: () => '/news/',

  // notifications
  notificationSettings: () => '/notification/settings',
  notificationTokenAdd: () => '/notification/token/add',
  notificationTokenRemove: () => '/notification/token/remove',

  // chats
  chats: () => 'chat/',
  chatCreate: () => '/chat/create/',
  chatNotificationSettings: (chatId: number) => `chat/${ chatId }/notifications`,
  chatSend: (chatId: number) => `/chat/${ chatId }/send/`,
  chatLogout: (chatId: number) => `chat/${ chatId }/logout/`,
  chatSearch: () => '/chat/search_chats/',

  // chat messages
  chatMessage: (messageId: number) => `/chat/message/${ messageId}`,

  // chat details
  chatDetail: (chatId: number) => `/chat/${ chatId }/detail/`,
  chatDetailMedia: (chatId: number) => `/chat/${ chatId }/detail/media/`,
  chatDetailFile: (chatId: number) => `/chat/${ chatId }/detail/file/`,
  chatDetailAudio: (chatId: number) => `/chat/${ chatId }/detail/audio/`,

  // chat detail user action
  chatRemoveUsers: (chatId: number) => `/chat/${ chatId }/remove_users/`,
  chatUpdateUsers: (chatId: number) => `/chat/${ chatId }/update_users/`,
  chatRemoveAdmins: (chatId: number) => `/chat/${ chatId }/remove_admins/`,
  chatUpdateAdmins: (chatId: number) => `/chat/${ chatId }/update_admins/`,

  // auth jwt
  jwtRefresh: () => '/auth/jwt/refresh/',

  // users
  userMe: () => 'auth/users/me/',
  userId: (userId: number) => `user/${ userId }`,
  users: () => '/user/',
  userSearch: () => 'chat/search_users/',

};
