import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const useAsyncStorage = <T>(key: string) => {
  const getItem = React.useCallback(async () => {
    return await AsyncStorage.getItem(key);
  }, [key]);

  const setItem = React.useCallback(async (item: T) => {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  }, [key]);

  const remove = React.useCallback(async () => {
    await AsyncStorage.removeItem(key);
  }, [key]);

  return { getItem, setItem, remove };
};

export default useAsyncStorage;
