import { ParamListBase } from '@react-navigation/native';

export interface ChatDetailsMTTParamList extends ParamListBase {
  ChatInfo: undefined,
  ChatMedia: undefined,
  ChatAudio: undefined,
  ChatFiles: undefined,
  ChatUsers: undefined,
}

export const TabBarLabel: any = {
  ChatInfo: 'Инфо',
  ChatMedia: 'Медиа',
  ChatAudio: 'Голосовые',
  ChatFiles: 'Файлы',
  ChatUsers: 'Участники',
};
