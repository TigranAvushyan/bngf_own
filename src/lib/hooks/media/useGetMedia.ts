import { usePermissions } from './usePermissions';
import { useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-media-library';
import useArray from '../useArray';
import { convertLocalIdentifierToAssetLibrary } from '../../utils';
import { Platform } from 'react-native';

const getPhotos = async (limit: number, currentPage: number, lastItemID: string | undefined) => {
  return await MediaLibrary.getAssetsAsync({
    after: Platform.OS === 'android' ? `${ (currentPage - 1) * limit }` : lastItemID,
    first: limit,
    sortBy: ['modificationTime'],
    mediaType: ['photo'],
  });
};

const convertPhToUri = (assets: Asset[]) => {
  return assets.map((asset) => {
    if (asset.uri.startsWith('ph://')) {
      const identifier = asset.uri.replace('ph://', '');
      // image.JPG -> JPG
      const type = asset.filename.split('.')[1];
      const uri = convertLocalIdentifierToAssetLibrary(identifier, type);
      return { ...asset, uri };
    }
    return asset;
  });
};

export const useGetMedia = (limit = 20) => {
  const hasPermissions = usePermissions();

  const { array: media, push: mediaPush, clear } = useArray<Asset>([]);

  const currentPage = useRef(1);
  const hasPage = useRef(false);
  const lastItemID = useRef<string | undefined>(undefined); // for iOS


  const next = async () => {
    if (hasPage.current) {
      const { assets, hasNextPage, endCursor } = await getPhotos(limit, currentPage.current, lastItemID.current);
      mediaPush(convertPhToUri(assets));
      currentPage.current++;
      hasPage.current = hasNextPage;
      lastItemID.current = endCursor;
    }
  };

  const getFirstMedia = async () => {
    if (hasPermissions && !media.length) {
      const newVar = await getPhotos(limit, currentPage.current, lastItemID.current);
      const { assets, hasNextPage, endCursor } = newVar;
      clear();
      currentPage.current = currentPage.current + 1;
      mediaPush(convertPhToUri(assets));
      hasPage.current = hasNextPage;
      lastItemID.current = endCursor;
    }
  };

  return { media, next, getFirstMedia };
};
