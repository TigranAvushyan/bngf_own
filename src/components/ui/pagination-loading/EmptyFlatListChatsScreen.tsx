import React from 'react';
import { View } from 'react-native';
import ChatItemSkeleton from '../chat/ChatItemSkeleton';
import Hr from '../hr/Hr';
import { CHAT_PORTION_LIMIT } from '../../../store/chat/chatStore';

const EmptyFlatListChatsScreen = () => {
  const dummyFlatList = Array(CHAT_PORTION_LIMIT).fill(null);
  return (
    <>
      {
        dummyFlatList.map((_, key) => <View key={ key }>
          <ChatItemSkeleton />
          <Hr marginVertical={ 6 } />
        </View>)
      }
    </>
  );
};

export default EmptyFlatListChatsScreen;
