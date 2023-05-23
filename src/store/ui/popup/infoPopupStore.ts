import { createEvent, createStore } from 'effector';

export const setInfoPopupText = createEvent<string>();
export const hideInfoPopupText = createEvent();

export const $infoPopupText = createStore<string | null>(null)
    .on(setInfoPopupText, (_, payload) => payload)
    .reset(hideInfoPopupText);
