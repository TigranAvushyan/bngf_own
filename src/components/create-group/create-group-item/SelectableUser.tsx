import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SCREEN_PADDING } from '../../../style/global.style';
import CircleTickIcon from '../../ui/icons/tick/CircleTickIcon';
import { $selectedUsers, addRemoveSelectedUser } from '../../../store/chat/createChatStore';
import { useStore } from 'effector-react';
import Span from '../../ui/span/Span';
import UserItem from '../../user/UserItem';
import { BitrixProfile } from '../../../lib/types/user/userType';

interface CreateGroupUserPropsType {
  user: BitrixProfile,
  onlyOneUser?: boolean,
  chatRole?: 'Пользователь' | 'Владелец' | 'Админ'
}


// todo optimize algorithm of sorting and searching users
const SelectableUser: FC<CreateGroupUserPropsType> = ({ user, chatRole, onlyOneUser }) => {
  const selectedUsers = useStore($selectedUsers);


  const onSelect = () => {
    if (!onlyOneUser) {
      addRemoveSelectedUser(user);
      return;
    }
    if ((selectedUsers[0] && selectedUsers[0].bitrix_id !== user.bitrix_id) && selectedUsers.length ) return;
    addRemoveSelectedUser(user);
  };


  const isInSelectedUsers = React.useMemo(() => {
    return !!selectedUsers.find((s) => s.bitrix_id === user.bitrix_id);
  }, [user, selectedUsers]);

  return (
    <Pressable onPress={ onSelect }>
      <View style={ styles.container }>
        <UserItem
          avatar={ user.avatar || '' }
          name={ `${ user.first_name } ${ user.last_name }` }
          bottomSide={ <Span>{ chatRole }</Span> }
        />
        {
          isInSelectedUsers &&
          <CircleTickIcon style={ styles.selected } />
        }
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  hr: {
    backgroundColor: '#DEE0E8',
    height: 1,
    marginHorizontal: SCREEN_PADDING,
    flex: 1,
  },
  selected: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});

export default SelectableUser;
