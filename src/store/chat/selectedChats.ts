import { createEvent, createStore } from 'effector';
import { addRemove } from '../../lib/utils';

export const addSelectedChat = createEvent<number>();
export const toggleSelectedChat = createEvent<number>();
export const removeSelectedChat= createEvent<number>();
export const clearSelectedChats = createEvent();


export const $selectedChats = createStore<number[]>([])
    .on(addSelectedChat, (state, payload) => [...state, payload])
    .on(toggleSelectedChat, (state, payload) => addRemove(state, payload))
    .on(removeSelectedChat, (state, payload) => state.filter((i) => i !== payload))
    .reset(clearSelectedChats);
