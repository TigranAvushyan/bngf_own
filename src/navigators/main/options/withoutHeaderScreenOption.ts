import { StackNavigationOptions } from '@react-navigation/stack';

export const withoutHeaderScreenOption = (): StackNavigationOptions => {
  return {
    header: () => null,
  };
};
