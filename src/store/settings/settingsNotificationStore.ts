import { createEffect, createEvent, restore } from 'effector';
import { NotificationSettings } from '../../lib/types/settings/settingsTypes';
import { urls } from '../../lib/server/urls';
import { http_get } from '../../lib/server/http';

const notificationSettingInitState: NotificationSettings = {
  enabled: true,
  disableEnd: null,
};

interface NotificationSettingResponse {
  enabled: boolean,
  disable_end: string | null,
}


export const setNotificationSetting = createEvent<NotificationSettings>();
export const enableNotification = createEvent();


export const fetchNotificationSetting = createEffect(async () => {
  const url = urls.notificationSettings();
  try {
    const res = await http_get<NotificationSettingResponse>(url);
    return { ...res, disableEnd: res.disable_end };
  } catch (e) {
    console.log('fetchNotificationSetting: ', e);
  }
});

export const $notificationSetting = restore<NotificationSettings>(setNotificationSetting, notificationSettingInitState)
    .on(fetchNotificationSetting.done, (_, { result }) => result)
    .reset(enableNotification);
