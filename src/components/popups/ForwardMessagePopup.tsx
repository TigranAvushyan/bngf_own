import React, { FC } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useStore } from 'effector-react/effector-react.cjs';
import { $visibleForwardPopUP, setVisibleForwardPopUP } from '../../store/message/messageBackdropStore';
import BottomPopup from '../ui/popup/BottomPopup';
import ForwardPopupContent from './ForwardPopupContent';


const ForwardMessagePopup: FC = () => {
  const forwardMessagePopupRef = React.useRef<BottomSheetModal>(null);

  const isVisiblePopup = useStore($visibleForwardPopUP);

  React.useEffect(() => {
    if (isVisiblePopup) {
      forwardMessagePopupRef.current?.present();
    } else forwardMessagePopupRef.current?.dismiss();
  }, [isVisiblePopup]);

  return (
    <BottomPopup onDismiss={ () => setVisibleForwardPopUP(false) }
      maxSnapPoint={'100'}
      minSnapPoint={'50'}
      ref={ forwardMessagePopupRef }>
      <ForwardPopupContent/>
    </BottomPopup>
  );
};

export default ForwardMessagePopup;
