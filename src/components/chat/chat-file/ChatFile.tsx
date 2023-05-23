import React, { FC } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { FileType } from '../../../lib/types/chat/chatType';
import { humanFileSize } from '../../../lib/utils';
import Span from '../../ui/span/Span';
import AttachedFile from '../../ui/icons/attachedFile/AttachedFile';
import { FONTS } from '../../../style/global.style';

interface ChatFilePropsType {
  data: FileType[];
}

const ChatFile: FC<ChatFilePropsType> = ({ data }) => {
  const openFile = (file: FileType) => {
    Linking.openURL(file.file).catch((e) => console.log('ChatFile openFile: ', e));
  };

  return (
    <View>
      {
        data.map((file, idx) => (
          <Pressable
            key={ idx }
            onPress={ () => openFile(file) }
            style={ styles.container }
          >
            <View style={ styles.icon }>
              <AttachedFile />
            </View>
            <View style={ styles.description }>
              <Span style={ { fontFamily: FONTS['700'] } }>
                { file.file_name }
              </Span>
              <Span style={ {
                fontFamily: FONTS['700'],
                color: '#5E637A',
              } }>
                { humanFileSize(file.file_size) }
              </Span>
            </View>

          </Pressable>
        ))
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  description: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  icon: {
    marginRight: 8,
  },

});


export default ChatFile;
