import React, { FC, useEffect, useRef, useState } from 'react';
import BottomPopup from '../ui/popup/BottomPopup';
import NotificationSettings from '../notification-settings/NotificationSettings';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useStore } from 'effector-react';
import { $notificationPopup, setNotificationPopup } from '../../store/ui/popup/chatDetailNotificationStore';
import { StyleSheet, View } from 'react-native';
import { $currentChatDetail, setChatNotificationSettings } from '../../store/chat/chat-detail/chatDetailStore';
import { urls } from '../../lib/server/urls';
import { http_patch } from '../../lib/server/http';
import moment from 'moment';

const NotificationBottomPopup: FC = () => {
  const bottomPopupRef = useRef<BottomSheetModal>(null);
  const [minMaxSnapPoint, setMinMaxSnapPoint] = useState({ min: '50%', max: '50%' });
  const popup = useStore($notificationPopup);
  const currentChatDetail = useStore($currentChatDetail);
  const isDisabled =!currentChatDetail?.notifications.enabled;

  useEffect(() => {
    if (popup) {
      bottomPopupRef.current?.present();
      return;
    }
    bottomPopupRef.current?.dismiss();
  }, [popup]);

  useEffect(() => {
    if (isDisabled) setMinMaxSnapPoint({ min: '25%', max: '25%' });
    else setMinMaxSnapPoint({ min: '55%', max: '55%' });
  }, [isDisabled]);


  const disableNotification = async (hours: number) => {
    const chatId = currentChatDetail?.id || 0;
    const url = urls.chatNotificationSettings(chatId);
    try {
      await http_patch(url, { hours });
      setChatNotificationSettings({
        disableEnd: moment().add(hours, 'hours').format(),
        enabled: !hours,
        chatId,
      });
    } catch (e) {
      console.log('disableChatNotification: ', e);
    } finally {
      bottomPopupRef.current?.dismiss();
    }
  };


  return (
    <BottomPopup onDismiss={ () => setNotificationPopup(false) }
      ref={ bottomPopupRef }
      maxSnapPoint={minMaxSnapPoint.max}
      minSnapPoint={minMaxSnapPoint.min}>
      <View style={ styles.container }>
        <NotificationSettings isDisabled={ isDisabled }
          onSelectHour={ disableNotification } />
      </View>
    </BottomPopup >
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default NotificationBottomPopup;
