import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Span from '../../../components/ui/span/Span';
import { FONTS } from '../../../style/global.style';
import { useStore } from 'effector-react/effector-react.cjs';
import { $currentChatDetail } from '../../../store/chat/chat-detail/chatDetailStore';
import MessageAudio from '../../../components/chat/chat-audio/MessageAudio';
import { fromNow } from '../../../lib/utils';
import useKeyExtractor from '../../../lib/hooks/useKeyExtractor';
import { getChatDetailAudio } from '../../../store/chat/chat-detail/chatDetailStoreEvents';
import PaginationLoading from '../../../components/ui/pagination-loading/PaginationLoading';
import { useLoadMoreItems } from '../../../lib/hooks/useLoadMoreItems';
import NoFiles from '../../../components/ui/NoFiles/NoFiles';

const ChatDetailAudioScreen = () => {
  const currentChatDetail = useStore($currentChatDetail);

  const { isLoadingPortion, getNextPortion } = useLoadMoreItems(currentChatDetail?.audio.count || 0,
      currentChatDetail?.audio.results.length || 0,
      currentChatDetail?.audio.next || '', getChatDetailAudio,
      20,
      currentChatDetail?.id);

  const keyExtractor = useKeyExtractor();


  const renderItem = useCallback(({ item }) => {
    const dispatchDate = fromNow(item?.file_created || '');
    const user = item?.content_object?.bitrix_user;
    const name = `${ user?.first_name } ${ user?.last_name }`;
    return <View style={ styles.itemContainer }>
      <View style={ styles.text }>
        <Span style={ styles.userName }>{ name }</Span>
        <Span style={ styles.date }>{ dispatchDate }</Span>
      </View>
      <MessageAudio audioURI={ item.audio } />
    </View>;
  }, []);

  if (!currentChatDetail?.audio.results.length) return <NoFiles />;


  return (
    <View style={ styles.container }>
      <FlatList
        keyExtractor={ keyExtractor }
        onEndReached={ getNextPortion }
        onEndReachedThreshold={ 0.8 }
        ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion } /> }
        data={ currentChatDetail?.audio.results }
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
    paddingTop: 8,
    borderBottomColor: '#DEE0E8',
    borderBottomWidth: 1,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 45,
  },
  date: {
    color: '#17303F',
    fontSize: 14,
  },
  userName: {
    color: '#17303F',
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ChatDetailAudioScreen;
