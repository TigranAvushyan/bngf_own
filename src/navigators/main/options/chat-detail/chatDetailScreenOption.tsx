import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import ChatDetailsScreenHeader from '../../../../screens/chat-details/ChatDetailsScreenHeader';

export const chatDetailScreenOption = (): StackNavigationOptions => {
  return {
    header: () => <ChatDetailsScreenHeader />,
  };
};
