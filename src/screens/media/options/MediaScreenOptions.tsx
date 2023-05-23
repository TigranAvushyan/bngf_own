import React from 'react';
import { MainStackNavOptionsPropsType, Screens } from '../../../navigators/main/MainParamList';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import ArrowIcon from '../../../components/ui/icons/arrows/ArrowIcon';
import Span from '../../../components/ui/span/Span';
import { FONTS } from '../../../style/global.style';
import Touchable from '../../../components/ui/touchable/Touchable';
import { StackNavigationOptions } from '@react-navigation/stack';


const MediaScreenOptions = ({ navigation }: MainStackNavOptionsPropsType): StackNavigationOptions => {
  return {
    header: () => null,
  };
};


export default MediaScreenOptions;
