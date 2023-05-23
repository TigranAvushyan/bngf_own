import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from '../options/TopTabBar';
import ChatInfoScreen from '../../../screens/chat-details/chat-info/ChatInfoScreen';
import ChatDetailMediaScreen from '../../../screens/chat-details/chat-media/ChatDetailsMediaScreen';
import ChatDetailFilesScreen from '../../../screens/chat-details/chat-file/ChatDetailsFilesScreen';
import ChatDetailAudioScreen from '../../../screens/chat-details/chat-audio/ChatDetailAudioScreen';
import { ChatDetailsMTTParamList } from '../ChatDetailsParamList';
import { useStore } from 'effector-react/effector-react.cjs';
import ChatDetailUsersScreen from '../../../screens/chat-details/chat-users/ChatDetailUsers';
import { $currentChatDetail } from '../../../store/chat/chat-detail/chatDetailStore';


const ChatDetailsMTTNavigator: FC = () => {
  const Tab = createMaterialTopTabNavigator<ChatDetailsMTTParamList>();

  const chatDetail = useStore($currentChatDetail);

  return (
    <Tab.Navigator tabBar={ TopTabBar }>
      { chatDetail?.privat ?
        <Tab.Screen name={ 'ChatInfo' } component={ ChatInfoScreen } /> :
        <Tab.Screen name={ 'ChatUsers' } component={ ChatDetailUsersScreen } />
      }
      <Tab.Screen name={ 'ChatMedia' } component={ ChatDetailMediaScreen } />
      <Tab.Screen name={ 'ChatFiles' } component={ ChatDetailFilesScreen } />
      <Tab.Screen name={ 'ChatAudio' } component={ ChatDetailAudioScreen } />
    </Tab.Navigator>
  );
};

export default ChatDetailsMTTNavigator;

