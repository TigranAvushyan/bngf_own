import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useStore } from 'effector-react';
import ChatDetailsFileItem from '../../../components/items/ChatDetailsFileItem';
import { FONTS } from '../../../style/global.style';
import { $currentChatDetail } from '../../../store/chat/chat-detail/chatDetailStore';
import useKeyExtractor from '../../../lib/hooks/useKeyExtractor';
import { getChatDetailFile } from '../../../store/chat/chat-detail/chatDetailStoreEvents';
import PaginationLoading from '../../../components/ui/pagination-loading/PaginationLoading';
import { useLoadMoreItems } from '../../../lib/hooks/useLoadMoreItems';
import NoFiles from '../../../components/ui/NoFiles/NoFiles';


const ChatDetailsFilesScreen = () => {
  const currentChatDetail = useStore($currentChatDetail);
  const keyExtractor = useKeyExtractor();

  const { isLoadingPortion, getNextPortion } = useLoadMoreItems(currentChatDetail?.file.count || 0,
      currentChatDetail?.file.results.length || 0,
      currentChatDetail?.file.next || '', getChatDetailFile,
      20,
      currentChatDetail?.id);

  const renderItem = useCallback( ({ item }) => <ChatDetailsFileItem file={ item } />, []);

  if (!currentChatDetail?.file.results.length) return <NoFiles/>;

  return (
    <View style={ styles.container }>
      <FlatList
        keyExtractor={ keyExtractor }
        onEndReached={getNextPortion }
        onEndReachedThreshold={ 0.8 }
        ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion } /> }
        data={ currentChatDetail?.file.results }
        renderItem={ renderItem }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 13,
  },
  text: {
    marginLeft: 9,
  },
  title: {
    color: '#17303F',
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle: {},

});

export default ChatDetailsFilesScreen;
