import { useNavigation } from '@react-navigation/native';
import { MainStackNavHook } from '../../../navigators/main/MainParamList';

export const useMainNavigation = () => {
  return useNavigation<MainStackNavHook>();
};
