import { SocketResponseType } from '../../types/socket/socketTypes';
import {
  removeUserFromChatRouter,
  newChatCreatedRouter,
  newMessageRouter,
  newNewsRouter,
  onlineStatusRouter,
  readMessagesStatusRouter,
  updateChatRouter, addUserToChatRouter, addAdminToChatRouter, removeAdminFromChatRouter,
} from './socketRouters';
import { createEvent } from 'effector';
import { WEBSOCKET_URL } from '../../server/urls';

export const reconnectWebsocket = createEvent();

export const onSocketMessageHandler = (event: MessageEvent) => {
  const socketMessage: SocketResponseType = JSON.parse(event.data);
  console.log('WebSocket:  ', socketMessage);
  switch (socketMessage.action) {
    case 'read_messages_status':
      readMessagesStatusRouter(socketMessage);
      break;
    case 'add_news':
      newNewsRouter(socketMessage);
      break;
    case 'new_message':
      newMessageRouter(socketMessage);
      break;
    case 'add_user':
      addUserToChatRouter(socketMessage).then();
      break;
    case 'remove_user':
      removeUserFromChatRouter(socketMessage);
      break;
    case 'add_admin':
      addAdminToChatRouter(socketMessage).then();
      break;
    case 'remove_admin':
      removeAdminFromChatRouter(socketMessage);
      break;
    case 'new_chat_created':
      newChatCreatedRouter(socketMessage).then();
      break;
    case 'update_chat':
      updateChatRouter(socketMessage);
      break;
    case 'online_status':
      onlineStatusRouter(socketMessage);
      break;
  }
};

export const onSocketOpenHandler = () => {
  console.log('Websocket Connect');
};

export const onSocketErrorHandler = () => {
  console.log('Websocket Error');
};

export const onSocketCloseHandler = (e: Event) => {
  console.log('Websocket Disconnect', e);
  reconnectWebsocket();
};

export const connectHandler = (_: any, token: string): WebSocket => new WebSocket(WEBSOCKET_URL + `?token=${ token }`);
export const disconnectHandler = (socket: WebSocket | null): null => {
  socket?.close();
  return null;
};
