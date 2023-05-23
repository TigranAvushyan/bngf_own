import { createEvent, createStore } from 'effector';

export const showSwipeMenu = createEvent();
export const hideSwipeMenu = createEvent();
export const toggleSwipeMenu = createEvent();

export const $visibleSwipeMenu = createStore<boolean>(false)
    .on(showSwipeMenu, () => true)
    .on(hideSwipeMenu, () => false)
    .on(toggleSwipeMenu, (state) => !state);
