import { attach, createEffect, createEvent, createStore, guard } from 'effector';
import {
  connectHandler,
  disconnectHandler,
  onSocketCloseHandler,
  onSocketErrorHandler,
  onSocketMessageHandler,
  onSocketOpenHandler, reconnectWebsocket,
} from '../../lib/utils/socket/socketUtils';
import { removeUnreadMessagesCount } from '../chat/chatStore';
import { $isAuth } from '../auth/authStore';
import db from '../../lib/db/db';


export const connectWebsocket = createEvent<string>();
export const disconnectWebsocket = createEvent();


export const $socket = createStore<WebSocket | null>(null)
    .on(connectWebsocket, connectHandler)
    .on(disconnectWebsocket, disconnectHandler);


export const sendMessageReadWebSocket = attach({
  source: $socket,
  effect: (source, param) => {
    source?.send(JSON.stringify({
      action: 'read_all_messages',
      data: {
        chat_id: param.chatId,
      },
    }));
    removeUnreadMessagesCount(param.chatId);
  },
});


$socket.watch((socket) => {
  if (!socket) return;
  socket.addEventListener('open', onSocketOpenHandler);
  socket.addEventListener('message', onSocketMessageHandler);
  socket.addEventListener('error', onSocketErrorHandler);
  socket.addEventListener('close', onSocketCloseHandler);
});


guard({
  source: $isAuth,
  clock: reconnectWebsocket,
  filter: (isAuth) => isAuth,
  target: createEffect(async () => {
    const token = await db.get(db.fields.JWT_TOKEN);
    connectWebsocket(token?.access || '');
    console.log('reconnect', token?.access);
  }),
});
