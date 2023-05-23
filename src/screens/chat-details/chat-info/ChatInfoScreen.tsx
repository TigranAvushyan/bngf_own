import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useStore, useStoreMap } from 'effector-react';
import { $currentChatDetail, ChatDetailStore } from '../../../store/chat/chat-detail/chatDetailStore';
import { $profile } from '../../../store/auth/profileStore';
import { BitrixProfile } from '../../../lib/types/user/userType';
import TextArea, { TextAreaProps } from '../../../components/ui/area/text-area/TextArea';


const keyToStringName = [
  { mobile_phone: 'Мобильный телефон' },
  { work_phone: 'Рабочий телефон' },
  { internal_phone: 'Внутренняя телефония' },
  { organization: 'Организация' },
  { subdivision: 'Подразделение' },
  { city: 'Город' },
  { address: 'Улица, Дом' },
  { cabinet: 'Номер кабинета' },
  { skype: 'Скайп' },
  { position: 'Должность' },
];

const showBitrixProfile = (profile?: BitrixProfile) => {
  if (!profile) return null;
  const res: TextAreaProps[] = [];
  keyToStringName.forEach((obj) => {
    const key = Object.keys(obj)[0];
    // @ts-ignore
    const text = profile[key];
    // @ts-ignore
    const title = obj[key];

    if (text && title) {
      res.push({ title, text });
    }
  });
  // @ts-ignore
  profile.user.email && res.push({ title: 'E-mail', text: profile.user.email });
  return res;
};

const ChatInfoScreen: FC = () => {
  const profile = useStore($profile);

  const getCurrentUserInfo = (chadDetail: ChatDetailStore | null) => chadDetail?.users_profile.find((user) => user.bitrix_id !== profile?.bitrix.bitrix_id);


  const userInfo = useStoreMap($currentChatDetail, getCurrentUserInfo);
  const listData = showBitrixProfile(userInfo);


  return (
    <View style={ styles.container }>
      <FlatList
        style={ styles.list }
        keyExtractor={ (_, idx) => idx.toString() }
        data={ listData }
        renderItem={ ({ item }) =>
          <TextArea text={ item.text } title={ item.title } />
        } />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    backgroundColor: '#FFF',
  },
  list: {
    paddingHorizontal: 18,
  },
});

export default ChatInfoScreen;
