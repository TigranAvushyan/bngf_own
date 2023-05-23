import React, { FC } from 'react';
import UserItem from '../user/UserItem';
import { getStatus } from '../../lib/utils/auth/getStatus';
import { User } from '../../lib/types/user/userType';
import Span from '../ui/span/Span';
import { Pressable } from 'react-native';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import { Screens } from '../../navigators/main/MainParamList';
import moment from 'moment';
import { http_post } from '../../lib/server/http';
import { setActiveChat } from '../../store/chat/chat-detail/chatDetailStore';
import { getFullName } from '../../lib/utils';
import { urls } from '../../lib/server/urls';
import { Chat } from '../../lib/types/chat/chatType';

interface ContactItemPropsType {
  user: User,
  chatRole?: 'Пользователь' | 'Владелец' | 'Админ'
}

const createPrivateChat = async (user: User) => {
  try {
    const formData = new FormData();
    user.avatar && formData.append('image', user.avatar);

    formData.append('users_profile', user?.bitrix.bitrix_id.toString() || '');
    formData.append('title', `${ user.first_name } ${ user.last_name }`);
    formData.append('privat', 'true');
    formData.append('time', moment().format('YYYY-MM-DDTHH:mm'));

    const url = urls.chatCreate();
    const response = await http_post<Chat>(url, formData);
    setActiveChat({
      image: user.avatar,
      id: response.id,
      title: getFullName(user.first_name, user.last_name),
      usersCount: 2,
      private: true,
    });

    console.log('response: ', response);

    return response.id;
  } catch (e) {
    throw new Error(e);
  }
};

const ContactItem: FC<ContactItemPropsType> = ({ user }) => {
  const { navigate } = useMainNavigation();

  const redirectOrCreateChat = async () => {
    if (user.chat_user) {
      navigate(Screens.MESSAGES, { id: user.chat_user });
      setActiveChat({
        image: user.avatar,
        id: user.chat_user,
        title: getFullName(user.first_name, user.last_name),
        usersCount: 2,
        private: true,
      });
      return;
    }
    try {
      const chatId = await createPrivateChat(user);
      navigate(Screens.MESSAGES, { id: chatId });
    } catch (e) {
      console.log('redirectOrCreateChat: ', e);
    }
  };

  return (
    <Pressable onPress={ redirectOrCreateChat }>
      <UserItem
        avatar={ user.avatar || '' }
        name={ `${ user.first_name } ${ user.last_name }` }
        bottomSide={ <Span>{ getStatus(user?.is_online) }</Span> }
      />
    </Pressable>
  );
};

export default ContactItem;
