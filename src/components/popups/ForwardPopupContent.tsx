import React, { FC, useEffect, useState } from 'react';
import { setActiveMessage, setVisibleForwardPopUP } from '../../store/message/messageBackdropStore';
import { useStore } from 'effector-react';
import { Pressable, StyleSheet, View } from 'react-native';
import Span from '../ui/span/Span';
import { colors } from '../../style/colors';
import SearchInput from '../ui/input/search-input/SearchInput';
import SendMessageButton from '../ui/input/message-input/SendMessageButton';
import { $chats, CHAT_PORTION_LIMIT, getNextChats } from '../../store/chat/chatStore';
import Button from '../ui/buttons/Button';
import SelectableChatItem from '../chat/selectable-chatItem/SelectableChatItem';
import { $selectedChats, clearSelectedChats } from '../../store/chat/selectedChats';
import { useSendMessage } from '../../lib/hooks/chat/useSendMessage';
import { $searchOnChats, getSearchChatsResultFx, removeSearchStores } from '../../store/search/searchStore';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import PaginationLoading from '../ui/pagination-loading/PaginationLoading';
import { useLoadMoreItems } from '../../lib/hooks/useLoadMoreItems';

const ForwardPopupContent: FC = () => {
  const [inputValue, setInputValue] = useState('');

  const showSendButton = !!inputValue;

  const selectedChats = useStore($selectedChats);
  const searchOnChats = useStore($searchOnChats);
  const { chats, count, next } = useStore($chats);

  const {
    isLoadingPortion,
    getNextPortion,
  } = useLoadMoreItems(count, chats.length, next, getNextChats, CHAT_PORTION_LIMIT);

  const { forwardMessage } = useSendMessage(selectedChats[0]);

  useEffect(() => {
    if (inputValue.length) return;
    removeSearchStores();
  }, [inputValue, selectedChats]);

  useEffect(() => {
    return () => {
      clearSelectedChats();
      setVisibleForwardPopUP(false);
      setActiveMessage(null);
    };
  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Pressable
          onPress={ () => setVisibleForwardPopUP(false) }
          style={ styles.declineButton }>
          <Span
            style={ styles.declineButtonTitle }
          >Отмена</Span>
        </Pressable>
        <View style={ styles.titleContainer }>
          <Span
            style={ styles.title }
          >Переслать</Span>
        </View>
      </View>
      <View style={ styles.inputContainer }>
        <SearchInput
          style={ { height: 38 } }
          setValue={ setInputValue }
          placeholder={ 'Поиск' } />
        {
          showSendButton && <SendMessageButton onPress={ () => getSearchChatsResultFx(inputValue) } />
        }
      </View>
      <BottomSheetFlatList
        data={ searchOnChats.length ? searchOnChats : chats }
        onEndReached={ getNextPortion }
        ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion } /> }
        onEndReachedThreshold={ 0.75 }
        keyExtractor={ ((item, idx) => idx.toString()) }
        renderItem={ ({ item }) => {
          return <View>
            <SelectableChatItem chatItem={ item } />
          </View>;
        } } />
      <View>
        <Button
          disabled={ !selectedChats.length }
          onPress={ () => {
            forwardMessage();
            setVisibleForwardPopUP(false);
          } }
          title={ 'Переслать' } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 34,
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  declineButtonTitle: {
    fontSize: 14,
    color: colors.DARK,
  },
  titleContainer: {
    flex: 1.8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.DARK,
  },
  declineButton: {
    marginLeft: 13,
    justifyContent: 'center',
    flex: 1,
  },
});

export default ForwardPopupContent;
