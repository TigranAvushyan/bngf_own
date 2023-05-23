import React from 'react';
import Button from '../../components/ui/buttons/Button';
import { Image, StyleSheet, View } from 'react-native';
import { loginButtonStyle, loginStyles } from './style/loginScreenStyles';
import Span from '../../components/ui/span/Span';
import { FONTS } from '../../style/global.style';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';

const logo = require('../../../assets/img/logo.png');
const WelcomeScreen = ({ navigation }: MainStackNavProps<Screens.WELCOME>) => {
  return (
    <View style={ loginStyles.container }>

      <Image source={ logo } style={ styles.logo } />

      <View style={ styles.welcomeText }>
        <Span style={ styles.welcome }>Добро пожаловать</Span>
        <Span style={ styles.text }>{ 'Для входа в корпоративный мессенджер портала Битрикс24 нажмите на кнопку снизу' }</Span>
      </View>


      <Button
        style={ loginButtonStyle }
        onPress={ () => navigation.navigate(Screens.LOGIN) }
        title={ 'Вход' }
        icon={ 'right-alt-arrow' } />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  welcome: {
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 32,
    color: '#17303F',
  },
  text: {
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 14,
    color: '#5E637A',
    textAlign: 'center',
    width: 263,
  },
});

export default WelcomeScreen;
