import { Image } from 'react-native';
import { Asset } from 'expo-media-library';
import { manipulateAsync } from 'expo-image-manipulator';
import { ImageUriType } from '../../types/image';
import * as FileSystem from 'expo-file-system';


export const getImageSize = (
    url: string,
): Promise<{ width: number; height: number }> => new Promise((resolve, reject) => {
  Image.getSize(url,
      (width, height) => {
        resolve({ width, height });
      },
      (error) => {
        reject(error);
      },
  );
});

export const getCompressedImages = async (assets: Asset[]) => {
  return Promise.all(assets.map((asset) => {
    return manipulateAsync(asset.uri, [], { compress: 0.4 });
  }));
};

export const getTotalImagesSize = async (assets: Asset[]) => {
  const sizeImages: number[] = [];

  for (const asset of assets) {
    const { size } = await FileSystem.getInfoAsync(asset.uri);
    if (size) sizeImages.push(size);
  }

  return sizeImages.reduce((prevSize, currentSize) => prevSize + currentSize, 0);
};
