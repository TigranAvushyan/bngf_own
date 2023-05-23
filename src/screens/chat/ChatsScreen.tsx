import React, { FC, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatItem from '../../components/ui/chat/ChatItem';
import { useStore } from 'effector-react';
import { $chats, $isLoadingChats, CHAT_PORTION_LIMIT, fetchChats, getNextChats } from '../../store/chat/chatStore';
import { SCREEN_WIDTH } from '../../style/global.style';
import Hr from '../../components/ui/hr/Hr';
import PaginationLoading from '../../components/ui/pagination-loading/PaginationLoading';
import EmptyFlatListChatsScreen from '../../components/ui/pagination-loading/EmptyFlatListChatsScreen';
import { useLoadMoreItems } from '../../lib/hooks/useLoadMoreItems';
import { Chat } from '../../lib/types/chat/chatType';

const ChatsScreen: FC = () => {
  const isLoadingChats = useStore($isLoadingChats);
  const { chats, count, next } = useStore($chats);
  const {
    isLoadingPortion,
    getNextPortion,
  } = useLoadMoreItems(count, chats.length, next, getNextChats, CHAT_PORTION_LIMIT);

  useEffect(() => {
    fetchChats().then();
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <ChatItem item={ item } />;
  }, []);

  const keyExtractor = useCallback((item: Chat) => item.id.toString(), []);

  if (isLoadingChats) {
    return <EmptyFlatListChatsScreen />;
  }

  return (
    <View style={ styles.itemsContainer }>
      <FlatList
        data={ chats }
        ItemSeparatorComponent={ () => <Hr marginVertical={ 6 } /> }
        onEndReached={ getNextPortion }
        onEndReachedThreshold={ 0.8 }
        ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion } /> }
        keyExtractor={ keyExtractor }
        renderItem={ renderItem } />
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
  },

});

export default ChatsScreen;
