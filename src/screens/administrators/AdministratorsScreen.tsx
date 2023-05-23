import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from 'effector-react';
import { $currentChatDetail, addAdminToChat } from '../../store/chat/chat-detail/chatDetailStore';
import Screen from '../../components/ui/screen/Screen';
import { $selectedUsers, clearSelectedUsers } from '../../store/chat/createChatStore';
import Admins from '../../components/administrators/Admins';
import UserOnGroup from '../../components/administrators/UserOnGroup';


const AdministratorsScreen = () => {
  const currentChatDetail = useStore($currentChatDetail);
  const [showAdmins, setShowAdmins] = useState(true);


  const withoutAdminUsers = useMemo(() => {
    const admins = currentChatDetail?.admins_profile;
    return currentChatDetail?.users_profile?.filter((user) => !admins?.find((i) => i.bitrix_id === user.bitrix_id)) || [];
  }, [currentChatDetail]);

  const selected_users = useStore($selectedUsers);

  const onPressAdminsButton = useCallback(() => {
    setShowAdmins(false);
  }, []);


  useEffect(() => {
    return clearSelectedUsers();
  }, []);


  const addAdmins = useCallback(async () => {
    await addAdminToChat(selected_users);
    setShowAdmins(true);
  }, [selected_users]);


  return (
    <Screen scroll={ false }>
      {
          showAdmins ?
              <Admins
                admins={ currentChatDetail?.admins_profile || [] }
                creatorId={ currentChatDetail?.creator_profile.bitrix_id || 1 }
                onPressButton={ onPressAdminsButton }
                disableButton={ !withoutAdminUsers.length }
              /> :
              <UserOnGroup
                disableButton={ !selected_users.length }
                users={ withoutAdminUsers }
                onPressButton={ addAdmins }
              />
      }
    </Screen>
  );
};


export default AdministratorsScreen;
