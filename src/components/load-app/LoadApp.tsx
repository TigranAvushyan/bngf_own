import React, { FC, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import MainStackNavigator from '../../navigators/main/main-stack-navigator/MainStackNavigator';
import { fonts } from '../../style/fonts';
import { http_post } from '../../lib/server/http';
import { JwtToken } from '../../lib/types/token/jwtToken';
import db from '../../lib/db/db';
import { $isAuth, setAuth } from '../../store/auth/authStore';
import { $socket, connectWebsocket } from '../../store/socket/socketStore';
import { useStore } from 'effector-react';
import { Screens } from '../../navigators/main/MainParamList';
import { colors } from '../../style/colors';
import { urls } from '../../lib/server/urls';


const refreshToken = async (refresh?: string) => {
  if (refresh) {
    try {
      const url = urls.jwtRefresh();
      return await http_post<JwtToken>(url, { refresh });
    } catch (e) {
      console.log('refreshToken: ', e);
    }
  }
  return null;
};


const getAccessTokenIfConfirmed = async (): Promise<JwtToken | null> => {
  const token = await db.get(db.fields.JWT_TOKEN);
  if (token) {
    const newToken = await refreshToken(token?.refresh);
    if (newToken) {
      return newToken;
    }
  }
  return null;
};

const LoadApp: FC = () => {
  const [loaded] = useFonts(fonts);

  const isAuth = useStore($isAuth);
  const socket = useStore($socket);
  const [initialRout, setInitialRout] = useState<Screens.CHAT_NOTIFICATION | Screens.WELCOME>();

  useEffect(() => {
    if (socket) return;
    (async () => {
      const token = await getAccessTokenIfConfirmed();
      if (token) {
        connectWebsocket(token.access);
        await db.set(db.fields.JWT_TOKEN, token);
        setAuth(true);
        setInitialRout(Screens.CHAT_NOTIFICATION);
        return;
      }
      setInitialRout(Screens.WELCOME);
    })();
  }, [isAuth]);

  return (
    <>
      <StatusBar
        barStyle={ 'light-content' }
        animated
        showHideTransition={ 'slide' }
        backgroundColor={ colors.SMALT }
      />

      <SafeAreaView style={ styles.safeAreaColorSmalt } />

      <SafeAreaView style={ styles.safeAreaColorWhite }>
        <View style={ styles.container }>
          {
            initialRout && loaded ?
              <MainStackNavigator initialRoute={ initialRout } /> :
              <ActivityIndicator color={ colors.SMALT } size="large" />
          }
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaColorSmalt: {
    flex: 0,
    backgroundColor: colors.SMALT,
  },
  safeAreaColorWhite: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    flex: 1,
  },
});

export default LoadApp;
