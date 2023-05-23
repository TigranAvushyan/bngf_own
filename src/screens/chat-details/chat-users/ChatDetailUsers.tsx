import React, { FC, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useStore } from 'effector-react';
import { $currentChatDetail } from '../../../store/chat/chat-detail/chatDetailStore';
import ChatDetailUserItem from './ChatDetailUserItem';


const ChatDetailUsersScreen: FC = () => {
  const chatDetail = useStore($currentChatDetail);


  return (
    <View style={ styles.container }>
      <FlatList
        keyExtractor={ (i, idx) => idx.toString() }
        data={ chatDetail?.users_profile }
        renderItem={ ({ item }) => <ChatDetailUserItem user={ item } /> } />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default ChatDetailUsersScreen;
