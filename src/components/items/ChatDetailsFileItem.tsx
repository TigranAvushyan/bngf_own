import React, { FC } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { FONTS } from '../../style/global.style';
import moment from 'moment';
import Span from '../ui/span/Span';
import { ChatDetailFile } from '../../store/chat/chat-detail/chatDetailStore';
import FileTypeIcon from '../ui/icons/file-type/FileTypeIcon';
import { humanFileSize } from '../../lib/utils';

interface ChatDetailsFileItemPropsType {
  file: ChatDetailFile;
}

const ChatDetailsFileItem: FC<ChatDetailsFileItemPropsType> = ({ file }) => {
  const openFile = () => {
    Linking.openURL(file.file).catch((e) => console.log('ChatFile openFile: ', e));
  };

  return (
    <Pressable onPress={ openFile } style={ styles.itemContainer }>
      <FileTypeIcon fileName={ file?.file_name || '' } />
      <View style={ styles.text }>
        <Span style={ styles.title }>{ file.file_name }</Span>
        <Span
          style={ styles.subtitle }>{ humanFileSize(file?.file_size || 0) } KB, { moment(file.file_created).format('DD.MM.YY в HH:mm') }</Span>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 13,
  },
  text: {
    marginLeft: 9,
  },
  title: {
    color: '#17303F',
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle: {},
});

export default ChatDetailsFileItem;
