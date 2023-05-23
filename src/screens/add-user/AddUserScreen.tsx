import React, { useEffect, useState } from 'react';
import SearchInput from '../../components/ui/input/search-input/SearchInput';
import { FlatList, StyleSheet, View } from 'react-native';
import SelectableUser from '../../components/create-group/create-group-item/SelectableUser';
import { FONTS, SCREEN_PADDING } from '../../style/global.style';
import Screen from '../../components/ui/screen/Screen';
import SelectedUsers from '../../components/create-group/selected-users/SelectedUsers';
import Button from '../../components/ui/buttons/Button';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import { createGroupStyle } from '../create-group/createGroupStyle';
import { $selectedUsers, clearSelectedUsersStore } from '../../store/chat/createChatStore';
import { useStore } from 'effector-react';
import { $users, getNextPortionUsers, getUsers, USERS_PORTION_LIMIT } from '../../store/contacts/contactsStore';
import { useLoadMoreItems } from '../../lib/hooks/useLoadMoreItems';
import {
  $searchOnUsers,
  FOUND_USERS_PORTION_LIMIT,
  getNextPortionFoundUsersFX,
  getSearchUsersResult,
  removeSearchStores,
} from '../../store/search/searchStore';
import useTimeout from '../../lib/hooks/useTimeout';
import { RenderSectionHeader } from '../chat-search/ChatSearchRenderItems';
import Hr from '../../components/ui/hr/Hr';
import PaginationLoading from '../../components/ui/pagination-loading/PaginationLoading';

const AddUserScreen = ({ navigation, route }: MainStackNavProps<Screens.ADD_USER>) => {
  const { fromRout } = route?.params;
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNoFoundUsers, setIsNoFoundUsers] = useState(false);

  const { users, totalCount, nextPortionUrl } = useStore($users);
  const { foundUsers, totalCountFoundUsers, nextPortionFoundUsersUrl } = useStore($searchOnUsers);
  const selected = useStore($selectedUsers);
  const { start: onHideNoFoundUsersBlock } = useTimeout(() => setIsNoFoundUsers(false), 3000);

  const {
    isLoadingPortion,
    getNextPortion,
  } = useLoadMoreItems(totalCount, users.length, nextPortionUrl, getNextPortionUsers, USERS_PORTION_LIMIT);

  const {
    isLoadingPortion: isLoadingPortionFoundUsers,
    getNextPortion: getNextPortionFoundUsers,
  } = useLoadMoreItems(totalCountFoundUsers, foundUsers.length, nextPortionFoundUsersUrl, getNextPortionFoundUsersFX, FOUND_USERS_PORTION_LIMIT);


  const onPressHandler = () => {
    setInputValue('');
    if (fromRout === Screens.CREATE_GROUP || !fromRout) {
      navigation.navigate(Screens.CREATE_GROUP);
    }
  };

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

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!inputValue.length) removeSearchStores();
  }, [inputValue]);

  useEffect(() => removeSearchStores, []);

  useEffect(() => clearSelectedUsersStore, []);

  return (
    <Screen style={ styles.container } scroll={ false }>
      <View style={ styles.searchInput }>
        <SearchInput
          editable={ !isLoading }
          onSubmitEditing={ onSearch }
          placeholder={ isLoading ? 'Загрузка...' : 'Введите текст для поиска' }
          setValue={ setInputValue }
        />
        { isNoFoundUsers &&
          <View style={ styles.emptyBlockContainer }>
            <RenderSectionHeader section={ { title: 'Ничего не найдено' } } />
          </View>
        }
      </View>
      {
        !inputValue.length &&
        <SelectedUsers />
      }
      <FlatList
        data={ foundUsers.length ? foundUsers : users }
        keyExtractor={ (_, idx) => idx.toString() }
        renderItem={ ({ item }) => <SelectableUser user={ item.bitrix } /> }
        ItemSeparatorComponent={ Hr }
        onEndReached={ foundUsers.length ? getNextPortionFoundUsers : getNextPortion }
        onEndReachedThreshold={ 0.8 }
        ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion || isLoadingPortionFoundUsers } /> }
      />
      <View style={ createGroupStyle.buttonContainer }>
        <Button
          disabled={ selected.length < 1 }
          onPress={ onPressHandler }
          title={ 'Дальше' } />
      </View>
    </Screen>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  searchInput: {
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 13,
  },
  emptyBlockContainer: {
    marginTop: 5,
  },
  letter: {
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 18,
    color: '#5E637A',
    backgroundColor: '#F7F7F7',
    paddingVertical: 3,
    paddingHorizontal: SCREEN_PADDING,
  },
});

export default AddUserScreen;

