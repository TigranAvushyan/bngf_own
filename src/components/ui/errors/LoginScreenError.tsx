import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Span from '../span/Span';
import { colors } from '../../../style/colors';
import { FONTS } from '../../../style/global.style';
import ErrorIcon from '../icons/error/ErrorIcon';

interface LoginScreenErrorPropsType {
error: string
}

const LoginScreenError = ({ error }:LoginScreenErrorPropsType) => {
  return (
    <View style={styles.container}>
      <ErrorIcon/>
      <Span
        style={
          { marginLeft: 8,
            color: colors.ERROR_COLORS,
            fontFamily: FONTS['600'] }}>
        {error}</Span>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default LoginScreenError;
