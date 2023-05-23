import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import useCache from '../../../lib/hooks/cache/useCache';
import AvatarDefault from '../icons/avatar-default/AvatarDefault';

interface AvatarProps {
  uri?: string,
  size?: number,
  isOnline?: boolean,
}


const Avatar: FC<AvatarProps> = ({ uri, size = 44, isOnline = false }) => {
  const { uri: imageUri, loading } = useCache(uri || '');

  return (
    <View style={ [styles.itemsContainer, {
      width: size,
      height: size,
    }] }>
      { isOnline && <View style={ styles.onlineStatus } /> }
      {
        imageUri && !loading ? <Image
          style={ [styles.avatar, { borderRadius: size / 2 }] }
          source={ { uri: imageUri } }
        /> :
          <View style={ [styles.avatar] }>
            <AvatarDefault width={ size } height={ size } />
          </View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  itemsContainer: {
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  onlineStatus: {
    position: 'absolute',
    right: 1,
    top: 1,
    zIndex: 2,
    backgroundColor: '#4AF466',
    width: 10,
    height: 10,
    borderRadius: 5,

  },
});
export default Avatar;
