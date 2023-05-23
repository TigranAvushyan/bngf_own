import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import ArrowIcon from '../../components/ui/icons/arrows/ArrowIcon';
import { SCREEN_PADDING } from '../../style/global.style';
import Touchable from '../../components/ui/touchable/Touchable';
import CrossIcon from '../../components/ui/icons/cross/CrossIcon';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import { getSearchMessagesResult, removeSearchStores } from '../../store/search/searchStore';
import { useStore } from 'effector-react';
import { $currentChatDetail } from '../../store/chat/chat-detail/chatDetailStore';


const MessageScreenHeader = () => {
  const currentChat = useStore($currentChatDetail);
  const [isSearching, setIsSearching] = useState(false);
  const { goBack } = useMainNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const inputValue = useRef('');

  const getSearch = () => {
    inputValue.current = searchQuery;
    setSearchQuery('');
    setIsSearching(true);
    getSearchMessagesResult({
      url: `/chat/${ currentChat?.id || 0 }/?search=`,
      query: searchQuery,
    })
        .finally(() => {
          setIsSearching(false);
          console.log(inputValue.current);
          setSearchQuery(inputValue.current);
        });
  };

  const goBackHandler = () => {
    removeSearchStores();
    goBack();
  };

  const onDelete = () => {
    setSearchQuery('');
  };


  return <View style={ styles.container }>
    <Touchable onPress={ goBackHandler }>
      <View style={ styles.backIcon }>
        <ArrowIcon color={ '#FFFFFF' } />
      </View>

    </Touchable>
    <View style={ styles.inputContainer }>
      <TextInput
        editable={ !isSearching }
        returnKeyType={ 'search' }
        onSubmitEditing={ getSearch }
        style={ styles.input }
        placeholderTextColor="#fff"
        onChangeText={ setSearchQuery }
        value={ searchQuery }
        placeholder={ isSearching ? 'Поиск...' : 'Введите текст для поиска...' } />
    </View>
    {
      !!searchQuery &&
      <Pressable
        onPress={ onDelete }>
        <View style={ styles.crossIcon }>
          <CrossIcon color={ '#fff' } />
        </View>
      </Pressable>
    }
  </View>;
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: '#003F96',
    paddingHorizontal: SCREEN_PADDING,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendIcon: {
    marginRight: 16,
  },
  inputContainer: {
    marginLeft: 16,
    flex: 3,
  },
  backIcon: {
    justifyContent: 'center',
    flex: 1,
  },
  crossIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    color: '#fff',
  },
});

export default MessageScreenHeader;
