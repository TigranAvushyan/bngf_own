import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useStore } from 'effector-react';
import Touchable from '../../components/ui/touchable/Touchable';
import ArrowIcon from '../../components/ui/icons/arrows/ArrowIcon';
import Span from '../../components/ui/span/Span';
import { SCREEN_PADDING } from '../../style/global.style';
import { declOfNum } from '../../lib/utils';
import {
  $amIAdminOnCurrentChat,
  $currentChatDetail,
  setActivePrivateChat,
} from '../../store/chat/chat-detail/chatDetailStore';
import AvatarChangeable from '../../components/ui/avatar/AvatarChangeable';
import { Screens } from '../../navigators/main/MainParamList';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import TitleChangeable from '../../components/title-changeable/TitleChangeable';


const ChatDetailsScreenHeader: FC = () => {
  const { goBack } = useMainNavigation();

  const goBackAndRemoveActivePrivateChat = () => {
    setActivePrivateChat(null);
    goBack();
  };

  const currentChatDetail = useStore($currentChatDetail);

  const isAdminChat = useStore($amIAdminOnCurrentChat);

  const canChange = isAdminChat && !currentChatDetail?.privat;

  const usersNumber = currentChatDetail?.users_profile?.length || 0;
  return <View style={ styles.itemsContainer }>
    <Touchable onPress={ goBackAndRemoveActivePrivateChat }>
      <View style={ styles.back }>
        <ArrowIcon color={ '#FFFFFF' } />
        <Span style={ styles.backText }>Назад</Span>
      </View>
    </Touchable>


    <View style={ styles.user }>
      <AvatarChangeable
        isAdminChat={ canChange }
        uri={ currentChatDetail?.image } />

      <View style={ styles.userInfo }>

        <TitleChangeable isAdmin={ canChange } title={ currentChatDetail?.title || '' } />

        { !currentChatDetail?.privat &&
          <Span
            style={ styles.userStatus }>{ declOfNum(usersNumber, ['участник', 'участника', 'участников']) }</Span> }
      </View>

    </View>

  </View>;
};

const styles = StyleSheet.create({
  itemsContainer: {

    backgroundColor: '#003F96',
    paddingVertical: 16,
    paddingHorizontal: SCREEN_PADDING,
    alignItems: 'flex-start',
  },
  back: {
    flexDirection: 'row',

  },
  backText: {
    color: '#FFF',
    marginLeft: 5,
  },
  user: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 10,
  },
  userStatus: {
    color: '#FFFFFF',
  },
});

export default ChatDetailsScreenHeader;
