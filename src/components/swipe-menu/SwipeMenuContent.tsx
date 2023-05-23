import React from 'react';
import { StyleSheet, View } from 'react-native';
import SwipeMenuHeader from '../drawer/drawer-header/SwipeMenuHeader';
import SwipeMenuItem from '../drawer/drawer-item/SwipeMenuItem';
import { Screens } from '../../navigators/main/MainParamList';
import PeopleIcon from '../ui/icons/people/PeopleIcon';
import ProfileIcon from '../ui/icons/profile/ProfileIcon';
import SettingsIcon from '../ui/icons/settings/SettingsIcon';
import { clearAllStores, setAuth } from '../../store/auth/authStore';
import LogoutIcon from '../ui/icons/logout/LogoutIcon';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import { hideSwipeMenu } from '../../store/ui/swipe-menu/swipeMenuStore';
import { disconnectWebsocket } from '../../store/socket/socketStore';
import db from '../../lib/db/db';
import { http_delete } from '../../lib/server/http';
import { CommonActions } from '@react-navigation/native';
import { urls } from '../../lib/server/urls';


const removePushNotificationToken = async () => {
  try {
    const token = await db.get(db.fields.EXPO_TOKEN);
    if (token) {
      const url = urls.notificationTokenRemove();
      await http_delete(url, { params: { token } });
    }
  } catch (e) {
    console.log('removePushNotificationToken: ', e);
  }
};

const SwipeMenuContent = () => {
  const navigation = useMainNavigation();

  const onPressMenuItem = (screen: Screens, params?: any) => {
    return () => {
      navigation.navigate(screen, params);
      hideSwipeMenu();
    };
  };

  const onLogout = async () => {
    await removePushNotificationToken();
    await db.clear();
    setAuth(false);
    disconnectWebsocket();
    hideSwipeMenu();
    clearAllStores();
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Screens.WELCOME }],
        }),
    );
  };


  return (
    <View style={ styles.container }>
      <View style={ styles.itemsContainer }>


        <SwipeMenuHeader />

        <View style={ styles.items }>

          <SwipeMenuItem
            text={ 'Создать группу' }
            onPress={ onPressMenuItem(Screens.ADD_USER, { fromRout: Screens.CREATE_GROUP }) }
          >
            <PeopleIcon />
          </SwipeMenuItem>


          <SwipeMenuItem
            text={ 'Сотрудники' }
            onPress={ onPressMenuItem(Screens.CONTACTS) }
          >
            <ProfileIcon />
          </SwipeMenuItem>


          <SwipeMenuItem
            text={ 'Настройки' }
            onPress={ onPressMenuItem(Screens.SETTINGS) }
          >
            <SettingsIcon />
          </SwipeMenuItem>


        </View>


        <View style={ styles.footer }>
          <SwipeMenuItem text={ 'Выйти из аккаунта' } onPress={ onLogout }>
            <LogoutIcon />
          </SwipeMenuItem>
        </View>

      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemsContainer: {
    height: '100%',
  },

  items: {
    marginTop: 3,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 35,
  },
});


export default SwipeMenuContent;
