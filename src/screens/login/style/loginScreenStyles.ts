import { ButtonStyle } from '../../../components/ui/buttons/buttonStyles';
import { StyleSheet } from 'react-native';
import { LOGIN_SCREEN_PADDING } from '../../../style/global.style';
import { colors } from '../../../style/colors';

export const loginButtonStyle: ButtonStyle = {
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  icon: {
    color: colors.WHITE,
    activeColor: colors.WHITE,
  },
};

export const loginStyles = StyleSheet.create({
  container: {
    paddingHorizontal: LOGIN_SCREEN_PADDING,
    backgroundColor: colors.WHITE,
    justifyContent: 'space-between',
    paddingBottom: 116,
    paddingTop: 16,
    height: '100%',


  },
});
