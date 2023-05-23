import produce from 'immer';
import { NewsType } from './newsStoreTypes';
import { Table } from '../../lib/types';

export const getNextNewsHandler = (store: NewsType, payload:any) => {
  return produce(store, (draft) => {
    const table: Table = {};
    const uniqueNews = [...draft.news, ...payload.result.news].filter(({ id }) =>(!table[id] && (table[id] = 1)));
    return {
      totalItems: payload.result.count,
      nextPortionUrl: payload.result.next,
      news: uniqueNews,
    };
  });
};

export const addNewsHandler = (state: NewsType, payload: any) => {
  return {
    totalItems: state.totalItems + 1,
    nextPortionUrl: state.nextPortionUrl,
    news: [payload, ...state.news],
  };
};
