import React from 'react';
import { StyleSheet, View } from 'react-native';
import MessageImageCollage from './MessageImageCollage';
import MessageImageGrid from './MessageImageGrid';
import { useMainNavigation } from '../../../lib/hooks/navigation/useNavigation';
import { Screens } from '../../../navigators/main/MainParamList';
import { Time } from '../../../lib/types';

export type ImageData = { url: string } & Partial<{
  sentUserName: string,
  date: Time
}>

interface ChatImageProps {
  images: ImageData[];
  pressable?: boolean;
}

const ChatImage = React.memo<ChatImageProps>(({ images, pressable = false }) => {
  const imagesMap = images.map((i) => i.url);

  const { navigate } = useMainNavigation();

  const navigateMediaScreen = (index: number) => {
    navigate(Screens.MEDIA, {
      id: index,
      images: images.map((image) => ({
        url: image.url,
        date: image?.date || '',
        name: image?.sentUserName || '',
      })),
    });
  };

  return (
    <View>
      <View style={ styles.container }>
        <View style={ styles.imagesContainer }>
          {
            images.length > 4 ?
              <MessageImageCollage pressable={ pressable } onPressImage={ navigateMediaScreen } images={ imagesMap } /> :
              <MessageImageGrid pressable={ pressable } onPressImage={ navigateMediaScreen } images={ imagesMap } />
          }
        </View>
      </View>
    </View>

  );
});


const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    position: 'relative',
  },
  imagesContainer: {
    width: 'auto',
  },
  time: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#E3EAF0',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});


export default ChatImage;
