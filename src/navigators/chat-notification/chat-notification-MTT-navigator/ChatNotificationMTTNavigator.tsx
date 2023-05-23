import React, { useEffect } from 'react';
import ChatsScreen from '../../../screens/chat/ChatsScreen';
import NewsScreen from '../../../screens/news/NewsScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ChatNotificationParamList } from '../ChatNotificationParamList';
import ChatNotificationTopTabBar from '../options/ChatNotificationTopTabBar';
import { getUsers } from '../../../store/contacts/contactsStore';
import { getProfile } from '../../../store/auth/profileStore';

const ChatNotificationMTTNavigator = () => {
  const Tab = createMaterialTopTabNavigator<ChatNotificationParamList>();
  useEffect(() => {
    getUsers().then();
    getProfile().then();
  }, []);


  return (
    <Tab.Navigator
      screenOptions={ {
        swipeEnabled: true,
      } }
      tabBar={ (props) => <ChatNotificationTopTabBar { ...props } /> }>
      <Tab.Screen name="Chat" component={ ChatsScreen } />
      <Tab.Screen name="Notification" component={ NewsScreen } />
    </Tab.Navigator>
  );
};

export default ChatNotificationMTTNavigator;


