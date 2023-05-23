import { createEvent, createStore } from 'effector';
import { addRemove } from '../../lib/utils';
import { BitrixProfile } from '../../lib/types/user/userType';

export const addSelectedUser = createEvent<BitrixProfile>();
export const addRemoveSelectedUser = createEvent<BitrixProfile>();
export const removeSelectedUser = createEvent<BitrixProfile>();
export const clearSelectedUsers = createEvent();
export const clearSelectedUsersStore = createEvent();


// todo optimize
export const $selectedUsers = createStore<BitrixProfile[]>([])
    .on(addSelectedUser, (state, payload) => [...state, payload])
    .on(addRemoveSelectedUser, (state, payload) => addRemove(state, payload))
    .on(removeSelectedUser, (state, payload) => state.filter((i) => i?.bitrix_id !== payload?.bitrix_id))
    .on(clearSelectedUsers, () => [])
    .reset(clearSelectedUsersStore);
