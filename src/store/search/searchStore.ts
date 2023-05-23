import { createEffect, createStore } from 'effector/effector.cjs';
import { http_get } from '../../lib/server/http';
import { setUserHandler } from '../contacts/contactsStore';
import { PageType } from '../../lib/types';
import { createEvent } from 'effector';
import { Chat, ChatUserProfile, HttpChat, Message } from '../../lib/types/chat/chatType';
import { User } from '../../lib/types/user/userType';
import { urls } from '../../lib/server/urls';

interface GetSearchMessagesResult {
  url: string,
  query: string
}

interface SearchOnMessages {
  totalCount: number,
  next: string,
  messages: Message[]
}

interface FoundUsers {
  totalCountFoundUsers: number,
  nextPortionFoundUsersUrl: string,
  foundUsers: User[]
}

export const SEARCH_MESSAGES_URL = 'chat/search_messages/?search=';
export const FOUND_USERS_PORTION_LIMIT = 20;


export const getSearchUsersResult = createEffect(async (query: string) => {
  const url = urls.userSearch();
  try {
    const response = await http_get<PageType<any>>(url, {
      params: {
        search: query,
      },
    });
    return {
      totalCountFoundUsers: response.count,
      nextPortionFoundUsersUrl: response.next,
      foundUsers: response.results,
    };
  } catch (e) {
    console.log('getSearchUsersResult: ', e.message);
  }
});

export const getSearchMessagesResult = createEffect(async ({ url, query }: GetSearchMessagesResult) => {
  const resUrl = url + query;
  const response: PageType<any> = await http_get(resUrl);
  const messages = response.results;
  return {
    messages: messages.map((i) => ({ ...i, status: i.users_read.length > 0 ? 'read' : 'sent' })),
    next: response.next,
    totalCount: response.count,
  };
});

export const getNextMessages = createEffect(async (url: string) => {
  try {
    const response = await http_get<PageType<any>>(url, {
      baseURL: '',
    });
    const messages = response.results;
    return {
      totalCount: response.count,
      messages,
      next: response.next,
    };
  } catch (error) {
    console.log('getNextMessages: ', error.message);
  }
});

export const getNextPortionFoundUsersFX = createEffect(async (url: string) => {
  try {
    const response = await http_get<PageType<any>>(url, {
      baseURL: '',
    });
    return {
      totalCountFoundUsers: response.count,
      nextPortionFoundUsersUrl: response.next,
      foundUsers: response.results,
    };
  } catch (error) {
    console.log('getNextPortionFoundUsers: ', error.message);
  }
});

export const getSearchChatsResultFx = createEffect(async (query: string) => {
  const url = urls.chatSearch();
  try {
    const response: PageType<HttpChat> = await http_get(url, {
      params: {
        search: query,
      },
    });
    return response.results.map((chat: HttpChat) => ({
      ...chat,
      is_private: chat.privat,
      avatar: chat.image,
      users_profile: chat.users_profile.map((user: ChatUserProfile) => ({
        id: user.id,
        is_online: user?.user?.is_online,
      })),
    }));
  } catch (e) {
    console.log('getSearchChatsResultFx: ', e.message);
  }
});

export const removeSearchStores = createEvent();

export const $searchOnMessages = createStore<SearchOnMessages>({ totalCount: 0, next: '', messages: [] })
    .on(getSearchMessagesResult.done, (state, payload: any) => payload.result)
    .on(getNextMessages.done, (state, payload: any) => {
      if (state.messages.length + payload.result.messages.length > state.totalCount) return;
      return {
        totalCount: payload.result.totalCount,
        next: payload.result.next,
        messages: [...state.messages, ...payload.result.messages],
      };
    })
    .reset(removeSearchStores);

export const $searchOnUsers = createStore<FoundUsers>({ totalCountFoundUsers: 0, nextPortionFoundUsersUrl: '', foundUsers: [] })
    .on(getSearchUsersResult.done, setUserHandler)
    .on(getNextPortionFoundUsersFX.done, (state, payload: any) => {
      if (state.foundUsers.length + payload.result.foundUsers.length > state.totalCountFoundUsers) return;
      return {
        totalCountFoundUsers: payload.result.totalCountFoundUsers,
        nextPortionFoundUsersUrl: payload.result.nextPortionFoundUsersUrl,
        foundUsers: [...state.foundUsers, ...payload.result.foundUsers],
      };
    })
    .reset(removeSearchStores);

export const $searchOnChats = createStore<Chat[]>([])
    .on(getSearchChatsResultFx.done, (_, chat: any) => chat.result)
    .reset(removeSearchStores);

