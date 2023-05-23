import { createEvent, createStore } from 'effector';

export const hideAvatarSelectImagePopup = createEvent();
export const showAvatarSelectImagePopup = createEvent();
export const toggleAvatarSelectImagePopup = createEvent();

export const $visibleAvatarSelectImagePopup = createStore(false)
    .on(hideAvatarSelectImagePopup, () => false)
    .on(showAvatarSelectImagePopup, () => true)
    .on(toggleAvatarSelectImagePopup, (state) => !state);
