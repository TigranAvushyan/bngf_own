import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Span from '../../components/ui/span/Span';
import ArrowIcon from '../../components/ui/icons/arrows/ArrowIcon';
import { FONTS, SCREEN_PADDING, SCREEN_WIDTH } from '../../style/global.style';
import { useStore } from 'effector-react';
import { declOfNum } from '../../lib/utils';
import Avatar from '../../components/ui/avatar/Avatar';
import { $activeChat } from '../../store/chat/chat-detail/chatDetailStore';
import { Screens } from '../../navigators/main/MainParamList';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import { $isLoadingChatDetail } from '../../store/chat/chat-detail/chatDetailStoreEvents';
import { colors } from '../../style/colors';
import TextTicker from 'react-native-text-ticker';

const MessageScreenHeader: FC = () => {
  const { navigate } = useMainNavigation();
  const isLoadingChatDetail = useStore($isLoadingChatDetail);
  const activeChat = useStore($activeChat);

  const onPressTitleChat = () => {
    if (isLoadingChatDetail) return;
    navigate(Screens.CHAT_DETAILS);
  };

  return <View style={ styles.itemsContainer }>

    <Pressable onPress={ () => navigate(Screens.CHAT_NOTIFICATION) }>
      <View style={ styles.back }>
        <ArrowIcon color={ '#FFFFFF' } />
        <Span style={ styles.backText }>Назад</Span>
      </View>
    </Pressable>

    <Pressable onPress={ onPressTitleChat }>
      <View
        style={ styles.chatInfo }>

        <TextTicker
          style={ styles.chatInfoName }
          duration={ 5000 }
          animationType={ 'bounce' }
          bounce={ true }
          repeatSpacer={ 25 }
          marqueeDelay={ 300 }>
          { activeChat?.title }
        </TextTicker>

        {
          activeChat?.usersCount && !activeChat?.private &&
          <Span
            style={ styles.chatInfoCount }>{ declOfNum(activeChat?.usersCount || 0, ['участник', 'участника', 'участников']) }</Span>
        }
      </View>
    </Pressable>

    <Pressable
      style={ styles.avatarContainer }
      onPress={ onPressTitleChat }>
      <Avatar uri={ activeChat?.image } />
    </Pressable>

  </View>;
};

const styles = StyleSheet.create({
  itemsContainer: {
    height: 72,
    backgroundColor: colors.SMALT,
    paddingHorizontal: SCREEN_PADDING,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 54,
  },
  backText: {
    color: colors.WHITE,
    marginLeft: 5,
  },
  chatInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - (SCREEN_PADDING * 2) - 108,
    maxWidth: SCREEN_WIDTH - (SCREEN_PADDING * 2) - 108,
  },
  chatInfoName: {
    color: colors.WHITE,
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 18,
  },
  avatarContainer: {
    alignItems: 'flex-end',
    width: 54,
  },
  chatInfoCount: {
    color: colors.WHITE,
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
  },

});

export default MessageScreenHeader;
