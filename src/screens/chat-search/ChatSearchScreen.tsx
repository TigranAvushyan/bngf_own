import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, StyleSheet, View } from 'react-native';
import { SCREEN_PADDING, SCREEN_WIDTH } from '../../style/global.style';
import SearchInput from '../../components/ui/input/search-input/SearchInput';
import { useStore } from 'effector-react';
import Hr from '../../components/ui/hr/Hr';
import {
  $searchOnChats,
  $searchOnMessages,
  $searchOnUsers,
  getNextMessages,
  getSearchChatsResultFx,
  getSearchMessagesResult,
  getSearchUsersResult,
  removeSearchStores,
  SEARCH_MESSAGES_URL,
} from '../../store/search/searchStore';
import { RenderChatItem, RenderMessageItem, RenderSectionHeader, RenderUserItem } from './ChatSearchRenderItems';
import Button from '../../components/ui/buttons/Button';
import { useLoadMoreItems } from '../../lib/hooks/useLoadMoreItems';
import KeyboardAreaView from '../../components/keyboard-area-view/KeyboardAreaView';

const ChatSearchScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchOnMessages = useStore($searchOnMessages);
  const { isLoadingPortion, getNextPortion } = useLoadMoreItems(searchOnMessages.totalCount,
      searchOnMessages.messages.length,
      searchOnMessages.next, getNextMessages,
      20);

  const { foundUsers } = useStore($searchOnUsers);
  const chats = useStore($searchOnChats);
  const isEmptySearchStores = !(searchOnMessages.messages.length || foundUsers.length || chats.length);

  // todo write type fo section list and remove ts-ignore
  const sectionListData = [
    {
      title: 'Сотрудники',
      renderItem: RenderUserItem,
      data: foundUsers,
    },
    {
      title: 'Чаты',
      renderItem: RenderChatItem,
      data: chats,
    },
    {
      title: 'Сообщения',
      renderItem: RenderMessageItem,
      nextPortionUrl: searchOnMessages.next,
      data: searchOnMessages.messages || [],
    },

  ];

  const getSearch = () => {
    setIsSearching(true);
    const searchMessagesPromise = getSearchMessagesResult({ query: inputValue, url: SEARCH_MESSAGES_URL });
    const searchUsersPromise = getSearchUsersResult(inputValue);
    const searchChatsPromise = getSearchChatsResultFx(inputValue);
    Promise.all([searchMessagesPromise, searchUsersPromise, searchChatsPromise])
        .catch((error) => console.log('getSearch: ', error))
        .finally(() => setIsSearching(false));
  };


  useEffect(() => {
    return removeSearchStores;
  }, []);

  const LoadMoreButton = () => {
    return (
      <View style={{ padding: 8 }}>
        <Button
          disabled={isLoadingPortion}
          title={'Загрузить ещё'} onPress={getNextPortion}/>
      </View>
    );
  };

  return (
    <KeyboardAreaView>
      <View style={ styles.itemsContainer }>
        <View style={ styles.inputContainer }>
          <SearchInput
            editable={!isSearching}
            onSubmitEditing={getSearch}
            setValue={ setInputValue }
            placeholder={ isSearching ? 'Загрузка...' : 'Введите текст для поиска' } />
        </View>
        {isEmptySearchStores &&
        <RenderSectionHeader section={ { title: 'Ничего не найдено' } } />
        }
        <SafeAreaView style={{ flex: 1 }}>
          {
            !isSearching &&
          <SectionList
            ItemSeparatorComponent={ Hr }
            // @ts-ignore
            sections={ sectionListData }
            keyExtractor={ (item, index) => index.toString() }
            renderItem={ ({ section: { renderItem } }) => <View>{ renderItem }</View> }
            renderSectionFooter={ ({ section: { nextPortionUrl } }) => nextPortionUrl ? <LoadMoreButton /> : null}
            renderSectionHeader={ ({ section }) => section.data.length > 0 ?
              <RenderSectionHeader section={ section } /> : null}
          />
          }
        </SafeAreaView>
      </View>
    </KeyboardAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: SCREEN_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default ChatSearchScreen;
