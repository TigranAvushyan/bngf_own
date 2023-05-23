import { StyleSheet } from 'react-native';
import { FONTS } from '../../../style/global.style';

export const messageBackdropItemsStyle = StyleSheet.create({
  action: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomColor: '#DEE0E8',
    borderBottomWidth: 1,
  },
  actionText: {
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 18,
  },
});
