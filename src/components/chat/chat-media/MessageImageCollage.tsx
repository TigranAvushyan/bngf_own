import React, { useEffect } from 'react';
import { ImageStyle, Pressable, StyleProp, StyleSheet, View } from 'react-native';
import { getImageGrid, getImageRowWidthRatio } from '../../../lib/utils/chat/chat-image/chatImageUtils';
import { MESSAGE_PHOTO_BORDER_RADIUS, MESSAGE_PHOTO_CONTAINER } from './messgaePhotoStyle';
import CashedImage from '../../CashedImage';

interface MessageImageCollageProps {
  images: string[];
  onPressImage: (index: number) => void;
  pressable: boolean;
}

const MESSAGE_PHOTO_MAIN_HEIGHT = MESSAGE_PHOTO_CONTAINER / 2.25;

const getImageStyle = (rowCount: number, ratio: number): StyleProp<ImageStyle> => {
  return {
    width: MESSAGE_PHOTO_CONTAINER / rowCount * ratio - 2,
  };
};


const MessageImageCollage = React.memo<MessageImageCollageProps>(({ onPressImage, images, pressable }) => {
  const imageGrid = React.useMemo(() => getImageGrid(images), [images]);


  const onPress = (url: string) => () => {
    const index = images.indexOf(url);
    onPressImage(index);
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.imagesContainer }>
        {
          imageGrid.map((row, rowIndex) => {
            const ratio = getImageRowWidthRatio(row.length);
            return (
              <View style={ styles.rowContainer } key={ rowIndex }>
                {
                  row.map((column, columnIndex: number) =>
                    <Pressable disabled={ !pressable } key={ columnIndex } onPress={ onPress(column) }>
                      <CashedImage
                        imageUri={ column }
                        style={ [styles.image, getImageStyle(ratio.length, ratio[columnIndex])] } />
                    </Pressable>,
                  )
                }

              </View>
            );
          })
        }
      </View>
    </View>
  );
});


const styles = StyleSheet.create({
  container: {
    width: 'auto',
    margin: 4,
  },
  imagesContainer: {
    borderRadius: MESSAGE_PHOTO_BORDER_RADIUS + 2,
    overflow: 'hidden',
  },

  rowContainer: {
    flexDirection: 'row',
  },
  image: {
    height: MESSAGE_PHOTO_MAIN_HEIGHT,
    width: 100,
    margin: 1,
  },
});


export default MessageImageCollage;
