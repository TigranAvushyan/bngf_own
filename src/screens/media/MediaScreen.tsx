import React, { useEffect, useRef, useState } from 'react';
import { LogBox, Pressable, StyleSheet, View } from 'react-native';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import { FONTS, SCREEN_HEIGHT, SCREEN_PADDING, SCREEN_WIDTH } from '../../style/global.style';
import DownloadIcon from '../../components/ui/icons/download/DownloadIcon';
import GallerySwiper from 'react-native-gallery-swiper';
import MediaScreenHeader from './MediaScreenHeader';
import { colors } from '../../style/colors';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { getFileName } from '../../lib/utils';
import UserConfirmPopup from '../../components/popups/UserConfirmPopup';
import Span from '../../components/ui/span/Span';

const MediaScreen = ({ route }: MainStackNavProps<Screens.MEDIA>) => {
  const images = route.params.images.map((image) => ({ url: image.url }));
  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [popupText, setPopupText] = useState('Для того, чтобы продолжить, откройте Настройки > Приложения и уведомления и дайте разрешение на использование Галереи.');
  const [activeIndex, setActiveIndex] = useState(route.params.id);

  const onPageSelect = (page: number) => {
    setActiveIndex(page);
  };

  const onDownloadMedia = async () => {
    const { url } = images[activeIndex];
    const fileName = getFileName(url);
    const status = await requestPermission();
    if (status?.canAskAgain === false) {
      setVisiblePopup(true);
      setPopupText('Для того, чтобы продолжить, откройте Настройки > Приложения и уведомления и дайте разрешение на использование Галереи.');
    }
    if (status?.status === 'granted') {
      try {
        const localUri = url.startsWith('file') ? { uri: url } : await FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName);
        const asset = await MediaLibrary.createAssetAsync(localUri.uri);
        await MediaLibrary.createAlbumAsync('MediaBNGF', asset);
        setVisiblePopup(true);
        setPopupText('Загрузка завершена.');
      } catch (e) {
        console.log('onDownloadMedia: ', e.message);
        setVisiblePopup(true);
        setPopupText('Что-то пошло не так, пожалуйста, попробуйте снова.');
      }
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  return (
    <View style={ styles.container }>
      <MediaScreenHeader
        name={ route.params.images[activeIndex].name }
        date={ route.params.images[activeIndex].date }
      />
      <GallerySwiper
        scrollViewStyle={styles.listStyle}
        images={ images }
        initialNumToRender={ images.length }
        initialPage={ route.params.id }
        sensitiveScroll={ false }
        onPageSelected={ onPageSelect }
      />
      <View style={ styles.footer }>
        <Pressable
          style={ styles.downloadIcon }
          onPress={ onDownloadMedia }>
          <DownloadIcon />
        </Pressable>
        <Span style={ styles.text }>{ activeIndex + 1 } из { images?.length }</Span>
      </View>
      <UserConfirmPopup
        textButton={ 'Хорошо' }
        setVisible={ setVisiblePopup }
        onConfirm={ () => setVisiblePopup(false) }
        visible={ visiblePopup }
        text={ popupText }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  listStyle: {

    backgroundColor: colors.WHITE,
  },
  footer: {
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.2,
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  downloadIcon: {
    paddingHorizontal: SCREEN_PADDING,
    position: 'absolute',
    left: 0,
  },
  text: {
    color: '#17303F',
    fontSize: 16,
    fontFamily: FONTS['600'],
    fontWeight: '600',
  },
});

export default MediaScreen;
