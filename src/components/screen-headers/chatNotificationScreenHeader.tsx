import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Avatar from '../ui/avatar/Avatar';
import SearchIcon from '../ui/icons/search/SearchIcon';
import { Screens } from '../../navigators/main/MainParamList';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import { useStore } from 'effector-react';
import { $profile } from '../../store/auth/profileStore';
import { SCREEN_PADDING } from '../../style/global.style';
import { showSwipeMenu } from '../../store/ui/swipe-menu/swipeMenuStore';


export const ChatNotificationScreenHeader: FC = () => {
  const { navigate } = useMainNavigation();
  const profile = useStore($profile);

  const onPressAvatar = () => {
    showSwipeMenu();
  };

  const onPressSearchButton = () => {
    navigate(Screens.CHAT_SEARCH);
  };

  return (
    <View style={ styles.headerContainer }>
      <Pressable onPress={ onPressAvatar }>
        <Avatar uri={ profile?.avatar } />
      </Pressable>
      <Pressable onPress={ onPressSearchButton }>
        <SearchIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 72,
    backgroundColor: '#003F96',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
});


