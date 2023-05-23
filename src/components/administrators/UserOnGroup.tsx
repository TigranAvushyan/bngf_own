import React, { FC, useState } from 'react';
import { FlatList } from 'react-native';
import SelectableUser from '../create-group/create-group-item/SelectableUser';
import Button from '../ui/buttons/Button';
import { BitrixProfile } from '../../lib/types/user/userType';
import { adminsButtonStyle } from './adminsStyles';
import UserConfirmPopup from '../popups/UserConfirmPopup';
import { getFullName } from '../../lib/utils';
import { useStore } from 'effector-react';
import { $selectedUsers } from '../../store/chat/createChatStore';

interface UserOnGroupPropsType {
  users: BitrixProfile[],
  disableButton: boolean,
  onPressButton: () => void
}

const generatePopupTitle = (user: BitrixProfile) => {
  if (!user) return;
  const { first_name, last_name } = user;
  return getFullName(first_name, last_name);
};

const UserOnGroup: FC<UserOnGroupPropsType> = ({ users, onPressButton, disableButton }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const showPopup = () => {
    setVisiblePopup(true);
  };

  const selectedUsers = useStore($selectedUsers);

  return (
    <>
      <UserConfirmPopup
        onConfirm={ onPressButton }
        visible={ visiblePopup }
        setVisible={ setVisiblePopup }
        image={ selectedUsers[0] && selectedUsers[0].avatar }
        title={ generatePopupTitle(selectedUsers[0]) }
        text={ 'Назначить этого пользователя администратором?' }
      />
      <FlatList
        data={ users }
        renderItem={ ({ item }) => (
          <SelectableUser user={ item }
            onlyOneUser={ true }
            chatRole={ 'Пользователь' } />
        ) }
      />
      <Button
        style={ adminsButtonStyle }
        disabled={ disableButton }
        onPress={ showPopup }
        title={ 'Назначить' } />
    </>
  );
};

export default UserOnGroup;
