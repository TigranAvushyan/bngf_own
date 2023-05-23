import React, { FC, useRef } from 'react';
import BottomPopup from '../ui/popup/BottomPopup';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { mediaSelectStyles as styles } from '../ui/media/styles';
import { useGetMedia } from '../../lib/hooks/media/useGetMedia';
import { Asset } from 'expo-media-library';
import AvatarMediaItem from '../ui/media/AvatarMediaItem';
import { useStore } from 'effector-react';
import { $visibleAvatarSelectImagePopup } from '../../store/ui/popup/avatarPopupStore';
import CameraButton from '../ui/media/CameraButton';

interface AvatarSelectPropsType {
  onDismiss?: () => void,
  onSelect: (items: Asset) => void,
}


const AvatarSelectBottomPopup: FC<AvatarSelectPropsType> = ({ onSelect, onDismiss }) => {
  const bottomPopupRef = useRef<BottomSheetModal>(null);

  const popupVisible = useStore($visibleAvatarSelectImagePopup);

  const { media, getFirstMedia } = useGetMedia();

  React.useEffect(() => {
    if (popupVisible) {
      bottomPopupRef.current?.present();
      getFirstMedia().catch();
    } else {
      bottomPopupRef.current?.dismiss();
    }
  }, [popupVisible]);


  return (
    <BottomPopup onDismiss={ onDismiss } ref={ bottomPopupRef }>
      <BottomSheetFlatList
        data={ media }
        numColumns={ 3 }
        keyExtractor={ (_, idx) => idx.toString() }
        onEndReachedThreshold={ 0.1 }
        renderItem={ ({ item, index }) => {
          if (index === 0) return <CameraButton />;
          return <AvatarMediaItem item={ item } onSelect={ onSelect } />;
        } }
        contentContainerStyle={ styles.contentContainer }
      />
    </BottomPopup>
  );
};

export default AvatarSelectBottomPopup;
