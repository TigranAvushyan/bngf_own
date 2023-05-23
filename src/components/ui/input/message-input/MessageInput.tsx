import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { CHAT_INPUT_HEIGHT, SCREEN_PADDING } from '../../../../style/global.style';
import MediaSelectBottomPopup from '../../../popups/MediaSelectBottomPopup';
import Animated, { FadeInUp, FadeOutDown, Layout, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useSendMessage } from '../../../../lib/hooks/chat/useSendMessage';
import AudioRecordButton from '../../../audio-record/AudioRecordButton';
import RecordTimer from '../../../audio-record/RecordTimer';
import AttachMessageButton from './AttachMessageButton';
import SendMessageButton from './SendMessageButton';
import {
  $activeMessage,
  $visibleEditMessageQuote,
  editMessage,
  setActiveMessage,
  setVisibleEditMessageQuote,
} from '../../../../store/message/messageBackdropStore';
import { useStore } from 'effector-react';
import { addLastMessage } from '../../../../store/chat/chatStore';
import { Message } from '../../../../lib/types/chat/chatType';
import moment from 'moment';
import { ImageUriType } from '../../../../lib/types/image';
import UserConfirmPopup from '../../../popups/UserConfirmPopup';

interface MessageInputProps {
  chatId: number;
  messages: Message[] | undefined;
}

const MessageInput: FC<MessageInputProps> = ({ chatId, messages }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [onRecordMode, setOnRecordMode] = useState(false);
  const isVisibleEditMessageQuote = useStore($visibleEditMessageQuote);
  const activeMessage = useStore($activeMessage);
  const [visibleWarningPopup, setVisibleWarningPopup] = useState(false);

  const { sendText, text, setText, sendMedia, sendAudio } = useSendMessage(chatId);
  const isShowSendButton = !!text;

  useEffect(() => {
    if (!isVisibleEditMessageQuote) {
      setText('');
      return;
    }
    setText(activeMessage?.messageItem?.text || '');
  }, [isVisibleEditMessageQuote]);

  useEffect(() => {
    return () => {
      setText('');
      setVisibleEditMessageQuote(false);
    };
  }, []);

  const onSendMedia = (images: ImageUriType[]) => {
    sendMedia(images);
  };


  const isEditedMessageLast = () => {
    const lastMessageInChat = messages && messages[0];

    if (lastMessageInChat?.id === activeMessage?.messageItem.id) {
      addLastMessage({
        last_message: {
          id: activeMessage?.messageItem.id || 0,
          text: text,
          time: moment().format(),
        },
        chat_id: chatId,
      });
    }
  };

  const onEditMessage = () => {
    editMessage({ messageData: activeMessage, text });
    setVisibleEditMessageQuote(false);
    setText('');
    setActiveMessage(null);
    isEditedMessageLast();
  };

  return (
    <>
      <MediaSelectBottomPopup
        setVisibleWarningPopup={ setVisibleWarningPopup }
        showPopup={ showPopup }
        setShowPopup={ setShowPopup }
        onSendMedia={ onSendMedia } />

      {
        showPopup ?
          <View style={ styles.emptyTextInput } /> :
          <View style={ styles.container }>
            {
              onRecordMode ?
                <View style={ { flex: 1 } }>
                  <RecordTimer />
                </View> :
                <>
                  { !isVisibleEditMessageQuote &&
                    <AttachMessageButton onPress={ () => setShowPopup(true) } /> }
                  <Animated.View
                    entering={ FadeInUp }
                    exiting={ FadeOutDown }
                    style={ styles.textInput }>
                    <TextInput
                      returnKeyType={ 'send' }
                      onSubmitEditing={ sendText }
                      onChangeText={ setText }
                      value={ text }
                      placeholder={ 'Сообщение...' } />
                  </Animated.View>
                </>
            }

            <View>
              { isVisibleEditMessageQuote ?
                <SendMessageButton onPress={ onEditMessage } /> :
                <>
                  {
                    isShowSendButton ?
                      <SendMessageButton onPress={ sendText } /> :
                      <Animated.View
                        entering={ ZoomIn }
                        exiting={ ZoomOut }
                        layout={ Layout }
                      >
                        <AudioRecordButton
                          style={ styles.audioButton }
                          onRecordComplete={ sendAudio }
                          onRecordEnd={ () => setOnRecordMode(false) }
                          onRecordStart={ () => setOnRecordMode(true) }
                        />
                      </Animated.View>
                  }
                </>
              }
            </View>
            <UserConfirmPopup
              textButton={ 'Хорошо' }
              setVisible={ setVisibleWarningPopup }
              onConfirm={ () => setVisibleWarningPopup(false) }
              visible={ visibleWarningPopup }
              text={ 'Общий размеров отправляемых файлов не может превышать 32 Мбайт.' }
            />
          </View>

      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CHAT_INPUT_HEIGHT,
    paddingBottom: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
    borderTopColor: '#D6D8DC',
    borderTopWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    width: '100%',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  audioButton: {
    width: 29,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  emptyTextInput: {
    marginBottom: 70,
  },

});

export default MessageInput;

