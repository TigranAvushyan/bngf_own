import React from 'react';
import { MainStackNavOptionsPropsType } from '../MainParamList';
import { StyleSheet, View } from 'react-native';
import ArrowIcon from '../../../components/ui/icons/arrows/ArrowIcon';
import Span from '../../../components/ui/span/Span';
import { FONTS } from '../../../style/global.style';
import Touchable from '../../../components/ui/touchable/Touchable';
import { StackNavigationOptions } from '@react-navigation/stack';


const defaultScreenOption = (title: string) => ({ navigation }: MainStackNavOptionsPropsType): StackNavigationOptions => {
  return {
    header: () => (
      <View style={ styles.container }>
        <Touchable onPress={ navigation.goBack } style={ styles.back }>
          <ArrowIcon />
          <Span style={ styles.backLabel }>Назад</Span>
        </Touchable>
        <Span style={ styles.title }>{ title }</Span>
      </View>),
  };
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: '#003F96',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  back: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    padding: 18,
  },
  backLabel: {
    fontSize: 12,
    fontFamily: FONTS['600'],
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4.3,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS['700'],
    color: '#fff',
    fontWeight: '700',
  },
});

export default defaultScreenOption;
