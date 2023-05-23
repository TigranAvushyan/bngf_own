import { combine, createEvent, createStore } from 'effector';
import { User } from '../../lib/types/user/userType';
import { createEffect } from 'effector/compat';
import { PageType } from '../../lib/types';
import { http_get } from '../../lib/server/http';
import { attach } from 'effector/effector.umd';
import produce from 'immer';
import { urls } from '../../lib/server/urls';

export interface SetUserStatus {
  userId: number,
  status: boolean
}

export interface UsersStore {
  users: User[],
  nextPortionUrl: string,
  totalCount: number
}

export const USERS_PORTION_LIMIT = 20;

const initialState: UsersStore = {
  users: [],
  totalCount: 0,
  nextPortionUrl: '',
};


export const getUsers = createEffect(async () => {
  try {
    const { results, count, next } = await http_get<PageType<any>>(urls.users());
    return {
      users: mapResponseUsersToStore(results),
      totalCount: count,
      nextPortionUrl: next,
    };
  } catch (e) {
    console.log('getUsers: ', e);
  }
});

export const getNextPortionUsers = createEffect(async (url: string) => {
  try {
    const { results, count, next } = await http_get<PageType<any>>(url, {
      baseURL: '',
    });
    return {
      users: mapResponseUsersToStore(results),
      totalCount: count,
      nextPortionUrl: next,
    };
  } catch (e) {
    console.log('getUsers: ', e);
  }
});

export const setUserHandler = (_: any, payload: any) => {
  return payload.result;
};

const mapResponseUsersToStore = (users: any): User[] => {
  return users.map((user: User) => ({
    bitrix_id: user.bitrix?.bitrix_id,
    first_name: user.bitrix?.first_name,
    last_name: user.bitrix?.last_name,
    avatar: user.bitrix?.avatar,
    is_online: user.is_online,
    bitrix: user.bitrix,
    chat_user: user.chat_user,
  }));
};


export const setUserOnlineStatusHandler = (users: UsersStore, payload: SetUserStatus) => {
  return produce(users, (draft) => {
    const user = draft.users.find((user) => user.bitrix.bitrix_id === payload.userId);
    if (user) user.is_online = payload.status;
  });
};

export const setNextPortionUsersHandler = (users: UsersStore, payload: any) => {
  return {
    users: [...users.users, ...payload.result.users],
    totalCount: payload.result.totalCount,
    nextPortionUrl: payload.result.nextPortionUrl,
  };
};

export const setUserOnlineStatus = createEvent<SetUserStatus>();
export const clearUsersStore = createEvent();

export const $users = createStore<UsersStore>(initialState)
    .on(getUsers.done, setUserHandler)
    .on(getNextPortionUsers.done, setNextPortionUsersHandler)
    .on(setUserOnlineStatus, setUserOnlineStatusHandler)
    .reset(clearUsersStore);

export const getUsersFromStoreByIds = attach({
  source: $users,
  effect: (users, param: number[]) => {
    const ids = new Set(param);
    const res: User[] = [];
    users.users.forEach((i) => {
      if (ids.has(i.bitrix.bitrix_id)) {
        res.push(i);
      }
    });
    return res;
  },
});


export const getUserFromStore = attach({
  source: $users,
  effect: (users, id: number) => {
    for (const user of users.users) {
      if (user.bitrix.bitrix_id === id) {
        return user;
      }
    }
    return undefined;
  },
});


export const $onlineUsers = combine($users, (users) => users.users.filter((user) => user.is_online));

