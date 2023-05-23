import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';

interface PaginationLoadingPropsType {
  loading: boolean;
}

const PaginationLoading: FC<PaginationLoadingPropsType> = ({ loading }) => {
  return loading ? <ActivityIndicator color={ '#003F96' } size="large" /> : null;
};

export default PaginationLoading;
