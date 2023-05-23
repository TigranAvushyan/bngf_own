import { createEvent, restore } from 'effector';

export const setNotificationPopup = createEvent<boolean>();
export const toggleNotificationPopup = createEvent();
export const $notificationPopup = restore(setNotificationPopup, false)
    .on(toggleNotificationPopup, (state) => !state);


