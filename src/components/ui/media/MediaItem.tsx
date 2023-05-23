import React, { FC } from 'react';
import { Asset } from 'expo-media-library';
import Touchable from '../touchable/Touchable';
import { View } from 'react-native';
import { mediaSelectStyles as styles } from './styles';
import CashedImage from '../../CashedImage';


interface MediaItemPropsType {
  item: Asset,
  onSelect: (item: Asset) => boolean,
}

const MediaItem: FC<MediaItemPropsType> = ({ item, onSelect }) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const onSelectHandler = () => {
    const res = onSelect(item);
    if (res) setIsActive((p) => !p);
  };
  return <Touchable
    onPress={ onSelectHandler }
    style={ styles.imageContainer }>
    <CashedImage
      style={ styles.image }
      imageUri={ item.uri }
    />
    <View style={ [styles.select, { backgroundColor: isActive ? '#fff' : 'transparent' }] } />
  </Touchable>;
};


export default MediaItem;
