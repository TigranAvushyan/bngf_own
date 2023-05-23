import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import BottomPopup from '../ui/popup/BottomPopup';
import { Pressable, View } from 'react-native';
import { Asset } from 'expo-media-library';
import { addRemove } from '../../lib/utils';
import { mediaSelectStyles as styles } from '../ui/media/styles';
import MediaItem from '../ui/media/MediaItem';
import FileIcon from '../ui/icons/file/FileIcon';
import Span from '../ui/span/Span';
import { useGetMedia } from '../../lib/hooks/media/useGetMedia';
import * as DocumentPicker from 'expo-document-picker';
import { useStore } from 'effector-react';
import { useSendMessage } from '../../lib/hooks/chat/useSendMessage';
import { $activeChat } from '../../store/chat/chat-detail/chatDetailStore';
import SendMediaIcon from '../ui/icons/send/SendMediaIcon';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import CameraButton from '../ui/media/CameraButton';
import useKeyExtractor from '../../lib/hooks/useKeyExtractor';
import { getCompressedImages, getTotalImagesSize } from '../../lib/utils/image/imageUtil';
import { ImageUriType } from '../../lib/types/image';
import { MAX_SIZE_SENDING_FILES } from '../../lib/globalConsts';

interface MediaSelectPropsType {
  showPopup: boolean,
  setVisibleWarningPopup: Dispatch<SetStateAction<boolean>>,
  setShowPopup: Dispatch<SetStateAction<boolean>>,
  onSendMedia: (items: ImageUriType[]) => void,
}


const MediaSelectBottomPopup: FC<MediaSelectPropsType> = ({ showPopup, onSendMedia, setShowPopup, setVisibleWarningPopup }) => {
  const [selected, setSelected] = React.useState<Asset[]>([]);
  const bottomPopupRef = React.useRef<BottomSheetModal>(null);

  const { media, next, getFirstMedia } = useGetMedia();

  useEffect(() => {
    if (showPopup) {
      bottomPopupRef.current?.present();
      getFirstMedia().catch();
    } else {
      bottomPopupRef.current?.dismiss();
    }
  }, [showPopup]);

  const selectMedia = useCallback((item: Asset) => {
    const assets = addRemove(selected, item);
    if (assets.length < 11) {
      setSelected(assets);
      return true;
    }
    return false;
  }, [selected]);


  const onDismiss = () => {
    setShowPopup(false);
    setSelected([]);
  };

  const onPressSendButton = async () => {
    if (selected.length) {
      const totalSizeImages = await getTotalImagesSize(selected);
      if (totalSizeImages > MAX_SIZE_SENDING_FILES) return setVisibleWarningPopup(true);
      setShowPopup(false);
      const compressedImages = await getCompressedImages(selected);
      onSendMedia(compressedImages);
      setSelected([]);
    }
  };

  const activeChat = useStore($activeChat);
  const { sendFile } = useSendMessage(activeChat?.id || 0);

  const pickAndSendDocument = async () => {
    try {
      const documentsPickResult = await DocumentPicker.getDocumentAsync({
        type: 'application/*, audio/*, video/*',
        multiple: false,
      });
      if (documentsPickResult.type !== 'success') return;
      if (documentsPickResult.size && documentsPickResult.size > MAX_SIZE_SENDING_FILES) return setVisibleWarningPopup(true);

      const fileName = documentsPickResult.name;
      const fileUri = documentsPickResult.uri;
      const fileSize = documentsPickResult.size;
      sendFile(fileUri, fileSize || 0, fileName);
    } catch (e) {
      console.log('pickAndSendDocument: ', e);
    } finally {
      setShowPopup(false);
    }
  };

  const keyExtractor = useKeyExtractor();

  const renderItem = useCallback(({ item, index }) => {
    if (index === 0) return <CameraButton />;
    return <MediaItem item={ item } onSelect={ selectMedia } />;
  }, [selectMedia]);

  return (
    <BottomPopup
      onDismiss={ onDismiss }
      ref={ bottomPopupRef }
      minSnapPoint={ '45%' }
      maxSnapPoint={ media.length > 3 ? '55%' : '45%' }>
      <View style={ styles.container }>
        <BottomSheetFlatList
          data={ media }
          numColumns={ 3 }
          onEndReached={ (next) }
          onEndReachedThreshold={ 0.1 }
          keyExtractor={ keyExtractor }
          renderItem={ renderItem }
          contentContainerStyle={ styles.contentContainer }
        />


        <View style={ styles.buttonsContainer }>

          <Pressable onPress={ pickAndSendDocument }>
            <View style={ styles.icon }>
              <FileIcon />
            </View>
            <Span>Файлы</Span>
          </Pressable>


          {
            media && <Pressable
              onPress={ onPressSendButton }
              style={ styles.sendButton }>
              <SendMediaIcon />
            </Pressable>
          }

        </View>
      </View>
    </BottomPopup>
  );
};


export default MediaSelectBottomPopup;
