import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackParamList, Screens } from '../MainParamList';
import AddUserScreen from '../../../screens/add-user/AddUserScreen';
import ContactsScreen from '../../../screens/contacts/ContactsScreen';
import SettingsScreen from '../../../screens/settings/SettingsScreen';
import MediaScreen from '../../../screens/media/MediaScreen';
import MediaScreenOptions from '../../../screens/media/options/MediaScreenOptions';
import defaultScreenOption from '../options/defaultScreenOption';
import CreateGroupScreen from '../../../screens/create-group/CreateGroupScreen';
import ImageEditorScreen from '../../../screens/image-editor/ImageEditorScreen';
import MessageScreen from '../../../screens/messages/MessageScreen';
import ChatDetailsScreen from '../../../screens/chat-details/ChatDetailsScreen';
import ChatNotificationMTTNavigator
  from '../../chat-notification/chat-notification-MTT-navigator/ChatNotificationMTTNavigator';
import AdministratorsScreen from '../../../screens/administrators/AdministratorsScreen';
import ChatSearchScreen from '../../../screens/chat-search/ChatSearchScreen';
import AddUserCurrentGroupScreen from '../../../screens/add-user/AddUserCurrentGroupScreen';
import MessageBackdrop from '../../../components/message/MessageBackdrop';
import ChatSearchMessagesScreen from '../../../screens/chat-search/ChatSearchMessagesScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { chatNotificationScreenOption } from '../options/chat-notification/chatNotificationScreenOption';
import { chatDetailScreenOption } from '../options/chat-detail/chatDetailScreenOption';
import SwipeMenu from '../../../components/swipe-menu/SwipeMenu';
import WelcomeScreen from '../../../screens/login/WelcomeScreen';
import LoginScreen from '../../../screens/login/LoginScreen';
import loginStackNavOptions from '../options/login/loginScreenOptions';
import { messageScreenOption } from '../options/message/messasgeScreenOptions';
import InfoPopup from '../../../components/popups/InfoPopup';
import { withoutHeaderScreenOption } from '../options/withoutHeaderScreenOption';
import CameraScreen from '../../../screens/camera/CameraScreeen';
import CameraResultScreen from '../../../screens/camera/CameraResultScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


interface MainStackNavigatorProps {
  initialRoute: Screens.CHAT_NOTIFICATION | Screens.WELCOME;
}

const MainStackNavigator: FC<MainStackNavigatorProps> = ({ initialRoute }) => {
  const Stack = createStackNavigator<MainStackParamList>();

  return (


    <NavigationContainer>
      <InfoPopup />
      <MessageBackdrop />
      <SwipeMenu />
      <Stack.Navigator
        initialRouteName={ initialRoute }
      >

        <Stack.Screen
          name={ Screens.WELCOME }
          component={ WelcomeScreen }
          options={ withoutHeaderScreenOption }
        />

        <Stack.Screen
          name={ Screens.LOGIN }
          component={ LoginScreen }
          options={ loginStackNavOptions }
        />

        <Stack.Screen
          name={ Screens.CAMERA }
          component={ CameraScreen }
          options={ withoutHeaderScreenOption }
        />

        <Stack.Screen
          name={ Screens.CAMERA_RESULT }
          component={ CameraResultScreen }
          options={ withoutHeaderScreenOption }
        />

        <Stack.Screen
          name={ Screens.CHAT_NOTIFICATION }
          component={ ChatNotificationMTTNavigator }
          options={ chatNotificationScreenOption }
        />

        <Stack.Screen
          name={ Screens.MESSAGES }
          component={ MessageScreen }
          options={ messageScreenOption }
        />

        <Stack.Screen
          name={ Screens.CHAT_SEARCH_MESSAGES_SCREEN }
          component={ ChatSearchMessagesScreen }
        />

        <Stack.Screen
          name={ Screens.CHAT_DETAILS }
          component={ ChatDetailsScreen }
          options={ chatDetailScreenOption }
        />

        <Stack.Screen
          name={ Screens.CHAT_SEARCH }
          component={ ChatSearchScreen }
          options={ defaultScreenOption('Поиск') }
        />

        <Stack.Screen
          name={ Screens.IMAGE_EDITOR }
          component={ ImageEditorScreen }
          options={ { headerShown: false } }
        />

        <Stack.Screen
          name={ Screens.MEDIA }
          component={ MediaScreen }
          options={ MediaScreenOptions }
        />

        <Stack.Screen
          name={ Screens.ADMINISTRATORS }
          component={ AdministratorsScreen }
          options={ defaultScreenOption('Администраторы') }
        />

        <Stack.Screen
          name={ Screens.ADD_USER }
          component={ AddUserScreen }
          options={ defaultScreenOption('Создать группу') }
        />

        <Stack.Screen
          name={ Screens.ADD_USER_CURRENT_GROUP }
          component={ AddUserCurrentGroupScreen }
          options={ defaultScreenOption('Добавить пользователя') }
        />

        <Stack.Screen
          name={ Screens.CREATE_GROUP }
          component={ CreateGroupScreen }
          options={ defaultScreenOption('Создать группу') }
        />
        <Stack.Screen
          name={ Screens.CONTACTS }
          component={ ContactsScreen }
          options={ defaultScreenOption('Сотрудники') }
        />
        <Stack.Screen
          name={ Screens.SETTINGS }
          component={ SettingsScreen }
          options={ defaultScreenOption('Настройки') }
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
};


export default MainStackNavigator;
