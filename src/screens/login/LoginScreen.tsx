import React, { useState } from 'react';
import { http_post } from '../../lib/server/http';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import db from '../../lib/db/db';
import * as Device from 'expo-device';
import WebView from 'react-native-webview';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../style/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../style/global.style';
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import Url from '../../lib/class/url/Url';
import { JwtToken } from '../../lib/types/token/jwtToken';
import { setAuth } from '../../store/auth/authStore';
import { OAUTH_URL, REDIRECT_URL, urls } from '../../lib/server/urls';


const sendExpoTokenToServer = async () => {
  try {
    if (Device.isDevice) {
      const token = await db.get(db.fields.EXPO_TOKEN);
      const url = urls.notificationTokenAdd();
      await http_post(url, { token });
    }
  } catch (e) {
    console.log('sendExpoTokenToServer: ', e);
  }
};


const saveJwt = async (jwt: JwtToken | null) => {
  if (jwt) {
    await db.set(db.fields.JWT_TOKEN, jwt);
  }
};


const LoginScreen = ({ navigation }: MainStackNavProps<Screens.LOGIN>) => {
  const [loading, setLoading] = useState(true);

  const watchUrlChange = async (event: WebViewNavigation) => {
    const url = new Url(event.url);
    const baseUrl = url.getBaseUrl();
    if (baseUrl === REDIRECT_URL) {
      const jwt = url.getParams<JwtToken>();
      await saveJwt(jwt);
      await sendExpoTokenToServer();
      setAuth(true);
      navigation.navigate(Screens.CHAT_NOTIFICATION);
    }
  };


  return (
    <View style={ styles.container }>
      <WebView
        incognito={ true }
        onNavigationStateChange={ watchUrlChange }
        onLoadStart={ () => setLoading(true) }U
        onLoadEnd={ () => setLoading(false) }
        source={ { uri: OAUTH_URL } }
      />
      {
        loading && <ActivityIndicator style={ styles.loadingIndicator } color={ colors.SMALT } size="large" />
      }
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2,
    left: SCREEN_WIDTH / 2,
  },
});
export default LoginScreen;
