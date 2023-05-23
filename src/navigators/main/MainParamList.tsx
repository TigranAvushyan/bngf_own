import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core/lib/typescript/src/types';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Time } from '../../lib/types';
import { ImageUriType } from '../../lib/types/image';

export type MainStackParamList = {
  Welcome: undefined,
  Login: undefined,
  ChatNotification: undefined,
  AddUser: {
    fromRout: Screens.CHAT_DETAILS | Screens.CREATE_GROUP
  },
  CreateGroup: undefined,
  ImageEditor: {
    image_uri: string
  },
  AddUserCurrentGroup: undefined,
  Camera: undefined,
  CameraResult: { image: ImageUriType[] },
  Contacts: undefined,
  Settings: undefined,
  Messages: {
    id: number,
    search?: boolean,
  },
  ChatSearchMessagesScreen: {
    id: number
  },
  ChatSearch: undefined,
  Administrators: undefined,
  ChatDetails: undefined,
  Media: {
    id: number,
    images: {
      url: string,
      name: string,
      date: Time,
    }[]
  }
}

export enum Screens {
  WELCOME = 'Welcome',
  LOGIN = 'Login',
  CHAT_NOTIFICATION = 'ChatNotification',
  MESSAGES = 'Messages',
  CHAT_DETAILS = 'ChatDetails',
  CHAT_SEARCH = 'ChatSearch',
  IMAGE_EDITOR = 'ImageEditor',
  MEDIA = 'Media',
  ADMINISTRATORS = 'Administrators',
  ADD_USER = 'AddUser',
  ADD_USER_CURRENT_GROUP = 'AddUserCurrentGroup',
  CREATE_GROUP = 'CreateGroup',
  CONTACTS = 'Contacts',
  SETTINGS = 'Settings',
  CAMERA = 'Camera',
  CAMERA_RESULT = 'CameraResult',
  CHAT_SEARCH_MESSAGES_SCREEN = 'ChatSearchMessagesScreen',
}

export type MainStackNavProps<T extends keyof MainStackParamList> = {
  navigation: StackNavigationProp<MainStackParamList, T>;
  route: RouteProp<MainStackParamList, T>;
};


export type MainStackNavHook = DrawerNavigationProp<MainStackParamList, keyof MainStackParamList>


export interface MainStackNavOptionsPropsType {
  route: RouteProp<MainStackParamList>,
  navigation: MainStackNavHook
}
