import React, { FC } from 'react';
import UserItem from '../user/UserItem';
import Span from '../ui/span/Span';
import Hr from '../ui/hr/Hr';
import { View } from 'react-native';
import { removeAdminFromChat } from '../../store/chat/chat-detail/chatDetailStore';
import RemoveUserButton from '../../screens/chat-details/chat-users/RemoveUserButton';
import { getFullName } from '../../lib/utils';
import { BitrixProfile } from '../../lib/types/user/userType';

interface AdminItemPropsType {
  user: BitrixProfile,
  creatorId: number | undefined
}

const AdminItem: FC<AdminItemPropsType> = ({ user, creatorId }) => {
  const isCreator = React.useMemo(() => user.bitrix_id === creatorId, [user]);

  const removeAdmin = () => {
    removeAdminFromChat([user.bitrix_id]).catch();
  };


  const rightSide = () => {
    if (isCreator) return null;

    return <RemoveUserButton
      userConfirmPopupText={'Удалить этого пользователя из администраторов?'}
      onPressRemoveButton={ removeAdmin }
      name={ getFullName(user.first_name, user.last_name) }
      avatar={ user.avatar }
    />;
  };

  return (
    <View>
      <UserItem
        avatar={ user.avatar }
        name={ user.first_name + ' ' + user.last_name }
        bottomSide={ <Span>{ isCreator ? 'Владелец' : 'Админ' }</Span> }
        rightSide={ rightSide() }
      />
      <Hr />
    </View>
  );
};

export default AdminItem;
