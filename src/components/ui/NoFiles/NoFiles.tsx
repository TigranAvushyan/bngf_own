import React from 'react';
import NoFile from '../icons/file/NoFile';
import Span from '../span/Span';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../style/colors';
import { FONTS } from '../../../style/global.style';


const NoFiles = () => {
  return (
    <View style={ styles.container }>
      <NoFile/>
      <Span
        style={styles.title}>
        {'Пока ничего нет'}
      </Span>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    color: colors.PEN_LINE_ICON,
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 16,
  },
});

export default NoFiles;
