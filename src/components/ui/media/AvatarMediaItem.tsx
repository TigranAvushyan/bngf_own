import React, { FC } from 'react';
import { Asset } from 'expo-media-library';
import { Image, Pressable } from 'react-native';
import { mediaSelectStyles as styles } from './styles';


interface AvatarMediaItemPropsType {
  item: Asset,
  onSelect: (item: Asset) => void,
}

const AvatarMediaItem: FC<AvatarMediaItemPropsType> = ({ item, onSelect }) => {
  const onSelectHandler = () => {
    onSelect(item);
  };
  return (
    <Pressable
      onPress={ onSelectHandler }
      style={ styles.imageContainer }>
      <Image
        style={ styles.image }
        source={ { uri: item.uri } }
      />
    </Pressable>
  );
};


export default AvatarMediaItem;
