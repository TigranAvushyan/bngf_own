import { createEffect, createEvent, createStore } from 'effector';
import { http_get } from '../../lib/server/http';
import { PageType } from '../../lib/types';
import { addNewsHandler, getNextNewsHandler } from './newsUtils';
import { News, NewsType } from './newsStoreTypes';
import { urls } from '../../lib/server/urls';

export const NEWS_PORTION_LIMIT = 20;

const initialState = {
  totalItems: 0,
  nextPortionUrl: '',
  news: [],
};

export const fetchNews = createEffect(async () => {
  const url = urls.news();
  const response = await http_get<PageType<News>>(url);
  const { count, next, results } = response;

  return {
    totalItems: count,
    nextPortionUrl: next || '',
    news: results,
  };
});

export const getNextNews = createEffect(async (url: string): Promise<NewsType> => {
  const response = await http_get<PageType<News>>(url, {
    baseURL: '',
  });
  const { count, next, results } = response;

  return {
    totalItems: count,
    nextPortionUrl: next || '',
    news: results,
  };
});

export const addNews = createEvent<News>();
export const clearNotificationStore = createEvent();

export const $news = createStore<NewsType>(initialState)
    .on(fetchNews.done, (_, payload) => payload.result)
    .on(addNews, addNewsHandler)
    .on(getNextNews.done, getNextNewsHandler)
    .reset(clearNotificationStore);
