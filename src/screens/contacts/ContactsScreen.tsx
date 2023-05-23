import React, { FC, useCallback, useEffect, useState } from 'react';
import Screen from '../../components/ui/screen/Screen';
import { FlatList, StyleSheet, View } from 'react-native';
import SearchInput from '../../components/ui/input/search-input/SearchInput';
import { SCREEN_PADDING } from '../../style/global.style';
import { useStore } from 'effector-react';
import {
  $users,
  getNextPortionUsers,
  getUsers,
  USERS_PORTION_LIMIT,
} from '../../store/contacts/contactsStore';
import ContactItem from '../../components/contacts/ContactItem';
import Hr from '../../components/ui/hr/Hr';
import useKeyExtractor from '../../lib/hooks/useKeyExtractor';
import { useLoadMoreItems } from '../../lib/hooks/useLoadMoreItems';
import PaginationLoading from '../../components/ui/pagination-loading/PaginationLoading';
import {
  $searchOnUsers, FOUND_USERS_PORTION_LIMIT,
  getNextPortionFoundUsersFX,
  getSearchUsersResult,
  removeSearchStores,
} from '../../store/search/searchStore';
import { RenderSectionHeader } from '../chat-search/ChatSearchRenderItems';
import useTimeout from '../../lib/hooks/useTimeout';

const ContactsScreen: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isNoFoundUsers, setIsNoFoundUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { users, totalCount, nextPortionUrl } = useStore($users);
  const { foundUsers, totalCountFoundUsers, nextPortionFoundUsersUrl } = useStore($searchOnUsers);
  const { start: onHideNoFoundUsersBlock } = useTimeout(() => setIsNoFoundUsers(false), 3000);

  const {
    isLoadingPortion,
    getNextPortion,
  } = useLoadMoreItems(totalCount, users.length, nextPortionUrl, getNextPortionUsers, USERS_PORTION_LIMIT);

  const {
    isLoadingPortion: isLoadingPortionFoundUsers,
    getNextPortion: getNextPortionFoundUsers,
  } = useLoadMoreItems(totalCountFoundUsers, foundUsers.length, nextPortionFoundUsersUrl, getNextPortionFoundUsersFX, FOUND_USERS_PORTION_LIMIT);

  const onSearch = () => {
    setIsLoading(true);
    getSearchUsersResult(inputValue)
        .then((searchResult) => {
          if (searchResult?.foundUsers.length) return;
          setIsNoFoundUsers(true);
          onHideNoFoundUsersBlock();
        })
        .finally(() => setIsLoading(false));
  };

  const keyExtractor = useKeyExtractor();

  const renderItem = useCallback(({ item }) => {
    return <ContactItem user={ foundUsers.length ? item.bitrix : item } />;
  }, [users, foundUsers]);

  useEffect(() => {
    if (users.length === 0) {
      getUsers().then();
    }
  }, [users.length]);

  useEffect(() => {
    if (!inputValue.length) removeSearchStores();
  }, [inputValue]);

  useEffect(() => {
    return removeSearchStores;
  }, []);


  return (
    <Screen scroll={ false }>
      <View style={ styles.input }>
        <SearchInput
          placeholder={ isLoading ? 'Загрузка...' : 'Поиск'}
          editable={!isLoading}
          returnKeyType={ 'search' }
          onSubmitEditing={ onSearch }
          setValue={ setInputValue } />
      </View>
      { isNoFoundUsers &&
        <View style={ styles.emptyBlockContainer }>
          <RenderSectionHeader section={ { title: 'Ничего не найдено' } } />
        </View>
      }
      <FlatList
        ItemSeparatorComponent={ Hr }
        keyExtractor={ keyExtractor }
        onEndReached={ foundUsers.length ? getNextPortionFoundUsers : getNextPortion }
        onEndReachedThreshold={ 0.8 }
        ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion || isLoadingPortionFoundUsers } /> }
        data={ foundUsers.length ? foundUsers : users }
        renderItem={ renderItem } />
    </Screen>
  );
};

const styles = StyleSheet.create({
  emptyBlockContainer: {
    marginTop: 5,
  },
  input: {
    paddingHorizontal: SCREEN_PADDING,
  },
});

export default ContactsScreen;
