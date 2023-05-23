import React, { FC } from 'react';
import Span from '../../../components/ui/span/Span';
import Hr from '../../../components/ui/hr/Hr';
import {
  $amIAdminOnCurrentChat,
  $currentChatDetail,
  removeUserFromChat,
} from '../../../store/chat/chat-detail/chatDetailStore';
import { StyleSheet, View } from 'react-native';
import { useStore, useStoreMap } from 'effector-react';
import Avatar from '../../../components/ui/avatar/Avatar';
import { FONTS, SCREEN_PADDING } from '../../../style/global.style';
import RemoveUserButton from './RemoveUserButton';
import { $profile } from '../../../store/auth/profileStore';
import { getStatus } from '../../../lib/utils/auth/getStatus';
import { getFullName } from '../../../lib/utils';
import { $onlineUsers } from '../../../store/contacts/contactsStore';
import { BitrixProfile } from '../../../lib/types/user/userType';

interface ChatDetailUserItemProps {
  user: BitrixProfile,
}


const ChatDetailUserItem: FC<ChatDetailUserItemProps> = ({ user }) => {
  const currentChatDetail = useStore($currentChatDetail);
  const profileId = useStoreMap($profile, (s) => s?.bitrix?.bitrix_id);
  const amIAdmin = useStore($amIAdminOnCurrentChat);

  const isMe = user.bitrix_id === profileId;

  const onlineUsers = useStore($onlineUsers);

  const removeUserOnPress = () => {
    removeUserFromChat([user.bitrix_id]).catch();
  };


  const getOnlineStatus = () => {
    if (isMe) return getStatus(true);
    const isOnline = onlineUsers.some((onlineUser) => onlineUser?.bitrix?.bitrix_id === user.bitrix_id);
    return getStatus(isOnline);
  };

  const rightSide = () => {
    const isUserCreator = currentChatDetail?.creator_profile.bitrix_id === user.bitrix_id;
    if (isUserCreator) return <Span style={ styles.adminText }>Владелец</Span>;

    const isUserAdmin = !!currentChatDetail?.admins_profile?.find((i) => i.bitrix_id === user.bitrix_id);

    if (isUserAdmin) return <Span style={ styles.adminText }>Админ</Span>;


    if (!isMe && !isUserAdmin && amIAdmin) {
      return <RemoveUserButton
        userConfirmPopupText={'Удалить этого пользователя из чата?'}
        onPressRemoveButton={ removeUserOnPress }
        avatar={ user.avatar }
        name={ getFullName(user.first_name, user.last_name) }
      />;
    }
    return null;
  };

  return (
    <View>
      <View style={ styles.user }>
        <Avatar uri={ user.avatar } />
        <View style={ styles.userInfo }>
          <Span style={ styles.name }>{ user.first_name } { user.last_name } </Span>
          <Span>{ getOnlineStatus() }</Span>
        </View>

        <View style={ styles.rightSide }>
          { rightSide() }
        </View>

      </View>
      <Hr />
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    backgroundColor: '#FFF',
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  userInfo: {
    marginLeft: 8,
    flex: 1,
  },
  name: {
    color: '#17303F',
    fontFamily: FONTS['700'],
    fontWeight: '700',
  },
  rightSide: {
    justifyContent: 'center',
  },
  adminText: {
    color: '#003F96',
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 12,
  },
});

export default ChatDetailUserItem;
