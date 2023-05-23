import { useStore } from 'effector-react';
import { addMessageEv } from '../../../store/message/messagesStore';
import { useCallback, useState } from 'react';
import { AudioFileData } from '../../../components/audio-record/AudioRecordButton';
import moment from 'moment';
import { ChatHTTPRequests } from '../../class/chat-http/ChatHTTPRequests';
import { useConst } from './useConst';
import {
  $activeMessage,
  setActiveMessage,
  setVisibleReplyMessageQuote,
} from '../../../store/message/messageBackdropStore';
import { $emptyMessage } from '../../../store/message/emptyMessageStore';
import { addLastMessage } from '../../../store/chat/chatStore';
import { getParents } from '../../utils/message/messageBackdropUtil';
import { ImageUriType } from '../../types/image';
import { urls } from '../../server/urls';

export const useSendMessage = (chatId: number) => {
  const emptyMessage = useStore($emptyMessage);
  const activeMessage = useStore($activeMessage);
  const [text, setText] = useState('');
  const parentId = activeMessage?.messageItem.id;
  const sendHttp = useConst(() => new ChatHTTPRequests(chatId));
  sendHttp.chatId = chatId;
  sendHttp.url = urls.chatSend(chatId);

  const sendText = useCallback(() => {
    if (!text) return;
    const time_send = moment().format();

    sendHttp.sendText(text, time_send, parentId).then();

    if (!emptyMessage) return;
    addMessageEv({
      chatId, message: {
        ...emptyMessage,
        text,
        time_send,
        parents: getParents(activeMessage),
      },
    });
    setVisibleReplyMessageQuote(false);
    setActiveMessage(null);
    setText('');
  }, [text, chatId, emptyMessage, activeMessage]);

  const forwardMessage = useCallback(() => {
    const time_send = moment().format();

    sendHttp.sendText(' ', time_send, parentId).then();

    if (!emptyMessage) return;

    addMessageEv({
      chatId, message: {
        ...emptyMessage,
        text: '',
        time_send,
        parents: getParents(activeMessage),
      },
    });
    addLastMessage({
      last_message: {
        bitrix_user: {
          avatar: activeMessage?.messageItem.bitrix_user.avatar || '',
          id: activeMessage?.messageItem.bitrix_user.id || 0,
          bitrix_id: activeMessage?.messageItem.bitrix_user.bitrix_id || 0,
          first_name: activeMessage?.messageItem.bitrix_user.first_name || '',
          last_name: activeMessage?.messageItem.bitrix_user.last_name || '',
        },
        id: activeMessage?.messageItem.id || 0,
        text: 'Пересланное сообщение' || null,
        time: time_send,
      },
      chat_id: chatId,
    });
    setActiveMessage(null);
  }, [text, chatId, emptyMessage, activeMessage]);


  const sendMedia = useCallback((images: ImageUriType[]) => {
    const time_send = moment().format();
    sendHttp.sendMedia(images, time_send, parentId).then();
    if (!emptyMessage) return;
    addMessageEv({
      chatId,
      message: {
        ...emptyMessage,
        time_send: time_send,
        parents: getParents(activeMessage),
        media: images.map((i) => ({ image: i.uri, file_size: '0' })),
      },
    });
    setActiveMessage(null);
    setVisibleReplyMessageQuote(false);
  }, [chatId, emptyMessage, activeMessage]);


  const sendDocument = useCallback((uri: string, fileSize: number, fileName: string) => {
    const time_send = moment().format();
    sendHttp.sendDocument(uri, fileName, time_send, parentId).then();
    if (!emptyMessage) return;
    addMessageEv({
      chatId,
      message: {
        ...emptyMessage,
        time_send: time_send,
        parents: getParents(activeMessage),
        file: [{
          file: fileName,
          file_size: fileSize,
          file_name: fileName,
        }],
      },
    });
    setActiveMessage(null);

    setVisibleReplyMessageQuote(false);
  }, [chatId, emptyMessage, activeMessage]);


  const sendAudio = useCallback((audio: AudioFileData) => {
    const time_send = moment().format();
    sendHttp.sendAudio(audio.data.uri, time_send, parentId).then();
    if (!emptyMessage) return;
    addMessageEv({
      chatId,
      message: {
        ...emptyMessage,
        time_send,
        parents: getParents(activeMessage),
        audio: [{
          audio: audio.data.uri,
          file_size: '0',
        }],
      },
    });
    setActiveMessage(null);

    setVisibleReplyMessageQuote(false);
  }, [chatId, emptyMessage, activeMessage]);

  return { sendText, forwardMessage, text, setText, sendMedia, sendAudio, sendFile: sendDocument };
};
