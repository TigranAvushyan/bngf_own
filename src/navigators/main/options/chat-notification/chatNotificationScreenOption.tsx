import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { ChatNotificationScreenHeader } from '../../../../components/screen-headers/chatNotificationScreenHeader';

export const chatNotificationScreenOption = (): StackNavigationOptions => {
  return {
    header: () => <ChatNotificationScreenHeader />,
  };
};
