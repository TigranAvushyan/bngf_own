import React, { FC } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import useCache from '../lib/hooks/cache/useCache';

interface CashedImagePropsType {
  imageUri: string,
  style?: StyleProp<ImageStyle>
}

const CashedImage: FC<CashedImagePropsType> = ({ imageUri, style }) => {
  const { uri, loading } = useCache(imageUri);

  if (loading) return null;

  return (
    <Image style={ style } source={ { uri } } />
  );
};

export default CashedImage;
