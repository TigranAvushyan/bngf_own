import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import { SCREEN_PADDING } from '../../style/global.style';
import { useStore } from 'effector-react';
import PaginationLoading from '../../components/ui/pagination-loading/PaginationLoading';
import MessageScreenHeaderSearch from '../messages/MessageScreenHeaderSearch';
import { $searchOnMessages, getNextMessages, removeSearchStores } from '../../store/search/searchStore';
import MessageSearchFooter from '../../components/ui/input/message-input/MessageSearchFooter';
import MessageItemView from '../../components/message/MessageItemView';
import { useLoadMoreItems } from '../../lib/hooks/useLoadMoreItems';

const ChatSearchMessagesScreen = ({ navigation }: MainStackNavProps<Screens.CHAT_SEARCH_MESSAGES_SCREEN>) => {
  const [indexScroll, setIndexScroll] = useState(0);
  const ref = useRef<FlatList | null>(null);
  const { messages, totalCount, next } = useStore($searchOnMessages);
  const { isLoadingPortion, getNextPortion } = useLoadMoreItems(totalCount,
      messages.length,
      next, getNextMessages,
      20);

  useEffect(() => navigation.setOptions({
    header: () => (
      <MessageScreenHeaderSearch />),
  }), []);

  useEffect(() => {
    setIndexScroll(0);
  }, [totalCount]);

  useEffect(() => {
    if (totalCount > 0) {
      ref.current?.scrollToIndex({
        index: indexScroll,

      });
    }
  }, [indexScroll]);

  useEffect(() => {
    return removeSearchStores;
  }, []);

  return (
    <View style={ styles.container }>
      <FlatList
        inverted
        ref={ ref }
        initialScrollIndex={ 0 }
        style={ styles.flatList }
        keyExtractor={ (_, idx) => idx.toString() }
        data={ messages }
        renderItem={ ({ item, index }) =>
          <View style={index === indexScroll && messages.length > 1 ? styles.selectedMessage : styles.defaultMessage}>
            <MessageItemView messageItem={ item } />
          </View>}
        onEndReached={ getNextPortion }
        onEndReachedThreshold={ 0.5 }
        ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion } /> }
        ListFooterComponentStyle={ { marginVertical: 10 } }
      />
      <MessageSearchFooter
        loading={ isLoadingPortion }
        totalCount={ totalCount }
        indexScroll={ indexScroll }
        setIndexScroll={ setIndexScroll }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#EEF0F4',
  },
  defaultMessage: {
    marginVertical: 6,
  },
  selectedMessage: {
    marginVertical: 6,
    paddingVertical: 4,
    paddingLeft: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 63, 150, 0.2)',
  },
  flatList: {
    position: 'relative',
    paddingHorizontal: SCREEN_PADDING,
    flex: 1,
  },
});

export default ChatSearchMessagesScreen;
