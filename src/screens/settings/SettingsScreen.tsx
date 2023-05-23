import React, { FC, useEffect } from 'react';
import NotificationSettings from '../../components/notification-settings/NotificationSettings';
import {
  $notificationSetting,
  fetchNotificationSetting,
  setNotificationSetting,
} from '../../store/settings/settingsNotificationStore';
import { urls } from '../../lib/server/urls';
import { http_patch } from '../../lib/server/http';
import moment from 'moment';
import { useStore } from 'effector-react';


const SettingsScreen: FC = () => {
  const notificationSettings = useStore($notificationSetting);


  useEffect(() => {
    fetchNotificationSetting().catch();
  }, []);

  const disableNotification = async (hours: number) => {
    const url = urls.notificationSettings();
    try {
      await http_patch(url, { hours });
      setNotificationSetting({
        enabled: !hours,
        disableEnd: moment().add(hours, 'hours').format(),
      });
    } catch (e) {
      console.log('disableNotification: ', e);
    }
  };


  return (
    <NotificationSettings isDisabled={ !notificationSettings.enabled } onSelectHour={ disableNotification } />
  );
};

export default SettingsScreen;
