import { createEffect, createEvent, forward, restore } from 'effector/effector.cjs';
import { http_delete, http_put } from '../../lib/server/http';
import { ActiveMessageType, EditMessage } from './messagesStore';
import { sample } from 'effector';
import { urls } from '../../lib/server/urls';

export const setActiveMessage = createEvent<ActiveMessageType | null>();
export const $activeMessage = restore(setActiveMessage, null);

export const setVisibleEditMessageQuote = createEvent<boolean>();
export const $visibleEditMessageQuote = restore(setVisibleEditMessageQuote, false);

export const setVisibleReplyMessageQuote = createEvent<boolean>();
export const $visibleReplyMessageQuote = restore(setVisibleReplyMessageQuote, false);

export const setVisibleForwardPopUP = createEvent<boolean>();
export const toggleVisibleForwardPopUP = createEvent();
export const $visibleForwardPopUP = restore(setVisibleForwardPopUP, false)
    .on(toggleVisibleForwardPopUP, (state) => !state);

export const deleteMessage = createEvent<ActiveMessageType>();
export const editMessage = createEvent<EditMessage>();


export const deleteMessageHttp = createEffect(async (messageData: ActiveMessageType) => {
  const url = urls.chatMessage(messageData.messageItem.id);
  return http_delete(url);
});


export const editMessageHttp = createEffect(async ({ messageData, text }: EditMessage) => {
  const url = urls.chatMessage(messageData?.messageItem.id || 0);
  return http_put(url, { 'text': text });
});


forward({
  from: deleteMessage,
  to: deleteMessageHttp,
});

forward({
  from: editMessage,
  to: editMessageHttp,
});

sample({
  // @ts-ignore
  clock: $visibleReplyMessageQuote,
  fn: (state) => {
    if (state) return false;
  },
  target: setVisibleEditMessageQuote,
});

sample({
  // @ts-ignore
  clock: $visibleEditMessageQuote,
  fn: (state) => {
    if (state) return false;
  },
  target: setVisibleReplyMessageQuote,
});
