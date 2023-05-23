import { StyleSheet } from 'react-native';
import { FONTS } from '../../../style/global.style';

export const areaStyle = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginVertical: 6,
  },
  title: {
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 12,
    color: '#5E637A',
  },
  text: {
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 14,
    color: '#17303F',
  },
});
