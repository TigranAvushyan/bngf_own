import React from 'react';
import { ImageStyle, Pressable, StyleProp, StyleSheet, View } from 'react-native';
import { MESSAGE_PHOTO_BORDER_RADIUS, MESSAGE_PHOTO_CONTAINER } from './messgaePhotoStyle';
import CashedImage from '../../CashedImage';

interface MessageImageGridProps {
  images: string[];
  onPressImage: (index: number) => void;
  pressable: boolean;
}

const MESSAGE_PHOTO_MAIN_HEIGHT = MESSAGE_PHOTO_CONTAINER / 1.15;
const MESSAGE_PHOTO_GRID_PADDING = 1;

const getImageStyle = (idx: number, imageArrLength: number): StyleProp<ImageStyle> => {
  const isLastItem = idx === imageArrLength - 1;
  return {
    height: MESSAGE_PHOTO_MAIN_HEIGHT / (imageArrLength - 1) - (isLastItem ? 0 : MESSAGE_PHOTO_GRID_PADDING),
    marginBottom: isLastItem ? 0 : MESSAGE_PHOTO_GRID_PADDING,
  };
};


const MessageImageGrid = React.memo<MessageImageGridProps>(({ images, onPressImage, pressable }) => {
  return (
    <View style={ styles.container }>
      <View style={ styles.imagesContainer }>
        <Pressable onPress={ () => onPressImage(0) }>
          <CashedImage imageUri={ images[0] } style={ [styles.image, styles.mainImage] } />
        </Pressable>
        <View>
          {
            images.map((uri, idx) => {
              if (idx === 0) return null;

              return <Pressable disabled={ !pressable } key={ idx } onPress={ () => onPressImage(idx) }>
                <CashedImage imageUri={ uri }
                  style={ [styles.image, getImageStyle(idx, images.length)] } />
              </Pressable>;
            })
          }
        </View>
      </View>
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: MESSAGE_PHOTO_BORDER_RADIUS,
    overflow: 'hidden',
  },
  image: {
    width: MESSAGE_PHOTO_CONTAINER / 2 - 0.5,
  },
  mainImage: {
    height: MESSAGE_PHOTO_MAIN_HEIGHT,
    marginRight: 1,
  },
});

export default MessageImageGrid;
