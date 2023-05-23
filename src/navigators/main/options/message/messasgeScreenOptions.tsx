import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import MessageScreenHeader from '../../../../screens/messages/MessageScreenHeader';

export const messageScreenOption = (): StackNavigationOptions => {
  return {
    header: () => <MessageScreenHeader />,
  };
};
