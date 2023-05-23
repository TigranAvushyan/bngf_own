import React from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import Span from '../../components/ui/span/Span';
import { FONTS, SCREEN_PADDING } from '../../style/global.style';
import UserItem from '../../components/user/UserItem';
import Hr from '../../components/ui/hr/Hr';
import { getStatus } from '../../lib/utils/auth/getStatus';
import Button from '../../components/ui/buttons/Button';
import { createGroupStyle } from './createGroupStyle';
import { useStore } from 'effector-react';
import { $selectedUsers, clearSelectedUsers, removeSelectedUser } from '../../store/chat/createChatStore';
import UserItemRightCross from '../../components/user/user-item/UserItemRightCross';
import { BitrixProfile } from '../../lib/types/user/userType';
import AvatarSelectBottomPopup from '../../components/popups/AvatarSelectBottomPopup';
import { Asset } from 'expo-media-library';
import AvatarChangeable from '../../components/ui/avatar/AvatarChangeable';
import moment from 'moment';
import { getFileObject } from '../../lib/utils';
import { http_post } from '../../lib/server/http';
import { hideAvatarSelectImagePopup } from '../../store/ui/popup/avatarPopupStore';
import { urls } from '../../lib/server/urls';


const CreateGroupScreen = ({ navigation }: MainStackNavProps<Screens.CREATE_GROUP>) => {
  const [name, setName] = React.useState('');
  const [avatarUri, setAvatarUri] = React.useState<string | undefined>(undefined);

  const users = useStore($selectedUsers);


  const count = React.useMemo(() => {
    const length = users.length;
    if (length > 1) return length + ' участника';
    return '1 участник';
  }, [users]);

  const onFinish = async () => {
    if (name) {
      try {
        const formData = new FormData();

        users.forEach((i) => {
          formData.append('users_profile', i?.bitrix_id.toString() || '');
        });

        // @ts-ignore
        avatarUri && formData.append('image', getFileObject(avatarUri));

        formData.append('title', name);
        formData.append('privat', 'false');
        formData.append('time', moment().format('YYYY-MM-DDTHH:mm'));

        const url = urls.chatCreate();

        await http_post(url, formData);
      } catch (e) {
        console.error(e);
      }

      clearSelectedUsers();
      setName('');
      navigation.navigate(Screens.CHAT_NOTIFICATION);
    }
  };

  const onRemoveUser = (user: BitrixProfile) => {
    removeSelectedUser(user);
  };


  const onSendMedia = async (item: Asset) => {
    const uri = item.uri;
    setAvatarUri(uri);
    hideAvatarSelectImagePopup();
  };


  return (
    <View style={ { flex: 1 } }>
      <View style={ styles.container }>
        <View style={ styles.header }>
          <AvatarChangeable uri={ avatarUri } />
          <TextInput
            maxLength={ 45 }
            placeholder={ 'Введите имя группы' }
            onChangeText={ setName }
            style={ styles.groupName } />
        </View>
        <Span style={ styles.userCount }>{ count }</Span>
        <FlatList
          keyExtractor={ (_, idx) => idx.toString() }
          data={ users }
          // todo optimize
          renderItem={ ({ item }) => (
            <>
              <UserItem
                avatar={ item.avatar }
                name={ `${ item.first_name } ${ item.last_name }` || '' }
                bottomSide={ <Span>{ getStatus( /* item.is_online*/ false) }</Span> }
                rightSide={
                  users.length > 1 ?
                    <UserItemRightCross onPress={ () => onRemoveUser(item) } /> :
                    null
                }
              />
              <Hr />
            </>
          ) } />
        <View style={ createGroupStyle.buttonContainer }>
          <Button
            disabled={ !name }
            onPress={ onFinish }
            title={ 'Завершить' } />
        </View>
      </View>
      <AvatarSelectBottomPopup
        onDismiss={ hideAvatarSelectImagePopup }
        onSelect={ onSendMedia } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  groupName: {
    color: '#8D8F98',
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
  },
  userCount: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 6,
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: '#F7F7F7',
  },

});


export default CreateGroupScreen;
