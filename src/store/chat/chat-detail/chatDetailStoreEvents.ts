import { createEffect } from 'effector/effector.cjs';
import { emptyPage, PageType } from '../../../lib/types';
import { http_get } from '../../../lib/server/http';
import { ChatDetailAudio, ChatDetailFile, ChatDetailInfo, ChatDetailMedia } from './chatDetailStore';
import { createEvent, restore } from 'effector';
import { urls } from '../../../lib/server/urls';

export const setIsLoadingChatDetail = createEvent<boolean>();

export const $isLoadingChatDetail = restore(setIsLoadingChatDetail, false);

export const getChatDetailMedia = createEffect(async ({ chatId, next }: {chatId: number, next?: string | null}) => {
  let res: PageType<ChatDetailMedia> = emptyPage;
  if (next) {
    res = await http_get<PageType<ChatDetailMedia>>(next, { baseURL: '' });
    return { media: res, chatId };
  } else {
    try {
      setIsLoadingChatDetail(true);
      const url = urls.chatDetailMedia(chatId);
      res = await http_get<PageType<ChatDetailMedia>>(url);
    } catch (e) {
      console.log('getChatDetailMedia: ', e.message);
    } finally {
      setIsLoadingChatDetail(false);
    }
  }
  return { media: res, chatId };
});


export const getChatDetailFile = createEffect(async ({ chatId, next }: {chatId: number, next?: string | null}) => {
  let res: PageType<ChatDetailFile> = emptyPage;
  if (next) {
    res = await http_get<PageType<ChatDetailFile>>(next, { baseURL: '' });
    return { file: res, chatId };
  } else {
    try {
      setIsLoadingChatDetail(true);
      const url = urls.chatDetailFile(chatId);
      res = await http_get<PageType<ChatDetailFile>>(url);
    } catch (e) {
      console.log('getChatDetailFile: ', e.message);
    } finally {
      setIsLoadingChatDetail(false);
    }
  }
  return { file: res, chatId };
});


export const getChatDetailAudio = createEffect(async ({ chatId, next }: {chatId: number, next?: string | null}) => {
  let res: PageType<ChatDetailAudio> = emptyPage;
  if (next) {
    res = await http_get<PageType<ChatDetailAudio>>(next, { baseURL: '' });
    return { audio: res, chatId };
  } else {
    try {
      setIsLoadingChatDetail(true);
      const url = urls.chatDetailAudio(chatId);
      res = await http_get<PageType<ChatDetailAudio>>(url);
    } catch (e) {
      console.log('getChatDetailAudio: ', e.message);
    } finally {
      setIsLoadingChatDetail(false);
    }
  }
  return { audio: res, chatId };
});

export const getChatDetailInfo = createEffect(async ({ chatId }: {chatId: number}) => {
  setIsLoadingChatDetail(true);
  const url = urls.chatDetail(chatId);
  const res = await http_get<ChatDetailInfo>(url);
  setIsLoadingChatDetail(false);
  return { info: res, chatId };
});

