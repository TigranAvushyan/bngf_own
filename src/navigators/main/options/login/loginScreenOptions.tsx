import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import Span from '../../../../components/ui/span/Span';
import { FONTS, LOGIN_SCREEN_PADDING } from '../../../../style/global.style';
import ArrowIcon from '../../../../components/ui/icons/arrows/ArrowIcon';
import Touchable from '../../../../components/ui/touchable/Touchable';
import { MainStackNavProps, Screens } from '../../MainParamList';


const loginStackNavOptions = ({ navigation }: MainStackNavProps<Screens.LOGIN>): StackNavigationOptions => {
  return {
    header: () => null,
    // header: () => (
    //   <View style={ styles.itemsContainer }>
    //     <Touchable style={ styles.icon } onPress={ navigation.goBack }>
    //       <ArrowIcon color={ '#17303F' } />
    //     </Touchable>
    //     <Span style={ styles.text }>Вход</Span>
    //   </View>
    // ),
  };
};

const styles = StyleSheet.create({
  itemsContainer: {
    height: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 75,
  },
  icon: {
    position: 'absolute',
    left: LOGIN_SCREEN_PADDING,
    padding: 5,
  },
  text: {
    fontFamily: FONTS['700'],
    fontSize: 26,
  },
});

export default loginStackNavOptions;
