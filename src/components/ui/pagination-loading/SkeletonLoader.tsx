import React from 'react';
import { Skeleton } from 'react-native-animated-skeleton';
import { colors } from '../../../style/colors';

interface SkeletonLoaderProps {
  width: number | string,
  height: number | string,
  backgroundColor?: string,
  numberOfItems?: number,
  borderRadius?: number,
}

export const SkeletonLoader = ({ numberOfItems = 1,
  width, height,
  borderRadius,
  backgroundColor = colors.SKELETON_BACKGROUND_COLOR }: SkeletonLoaderProps) => {
  return (
    <Skeleton loaderStyle={ { width: width,
      height: height,
      backgroundColor: backgroundColor,
      borderRadius: borderRadius }} numberOfItems={numberOfItems} />
  );
};
