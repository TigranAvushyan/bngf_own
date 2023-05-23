import React, { FC } from 'react';
import { Message } from '../../../lib/types/chat/chatType';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../style/colors';
import { FONTS } from '../../../style/global.style';
import Span from '../span/Span';
import ChatImage from '../../chat/chat-media/ChatImage';
import MessageAudio from '../../chat/chat-audio/MessageAudio';
import ChatFile from '../../chat/chat-file/ChatFile';

interface MessageItemView {
  messageItem: Message
}

const QuotedMessage: FC<MessageItemView> = ({ messageItem }) => {
  const images = messageItem.media.map((image) => ({ url: image.image }));
  return (
    <View style={styles.container}>
      <Span style={ styles.name }>
        { messageItem?.bitrix_user?.first_name }
      </Span>
      <View>
        { messageItem.media.length ? <ChatImage pressable={false} images={ images } /> : null }
        { messageItem.audio.length ? <MessageAudio audioURI={ messageItem.audio[0].audio } /> : null }
        { messageItem.file.length ? <ChatFile data={ messageItem.file } /> : null }
        { messageItem.text?.trim().length ? <Span numberOfLines={2} style={ styles.text }>{ messageItem.text }</Span> : null }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 1,
    borderLeftColor: colors.BORDER_GREY,
    paddingLeft: 6,
    marginBottom: 3,
  },
  text: {
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
    color: colors.DARK,
  },
  name: {
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 12,
    color: colors.DARK,
  },
});

export default QuotedMessage;
