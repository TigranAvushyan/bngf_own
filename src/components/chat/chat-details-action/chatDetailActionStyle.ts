import { StyleSheet } from 'react-native';
import { FONTS } from '../../../style/global.style';

const chatDetailActionStyle = StyleSheet.create({
  itemsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  itemsContainerAdmin: {
    justifyContent: 'space-between',
  },
  event: {
    marginBottom: 6,
    alignItems: 'center',
  },
  eventIcon: {
    backgroundColor: '#F5F5F5',
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,

  },
  eventTitle: {
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
  },
});

export default chatDetailActionStyle;
