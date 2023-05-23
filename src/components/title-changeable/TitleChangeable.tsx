import React, { FC, useState } from 'react';
import Span from '../ui/span/Span';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { FONTS } from '../../style/global.style';
import PenLineIcon from '../ui/icons/pen/PenLineIcon';
import SendIcon from '../ui/icons/send/SendIcon';
import { updateChatImageAndTitleHttp } from '../../store/chat/chat-detail/chatDetailStore';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

interface TitleChangeableProps {
  isAdmin: boolean,
  title: string
}

const TitleChangeable: FC<TitleChangeableProps> = ({ isAdmin, title }) => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState(title);

  const onSendTitle = async () => {
    if (title !== text) await updateChatImageAndTitleHttp({ title: text });
    setIsActive(false);
  };

  if (isActive) {
    return (
      <View style={ styles.container }>
        <TextInput
          autoFocus={ true }
          style={ styles.userName }
          onChangeText={ setText }
          value={ text }
        />
        <Pressable style={ styles.button } onPress={ onSendTitle }>
          <SendIcon color={ '#fff' } width={ 18 } height={ 13 } />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={ styles.titleContainer }>
      <Span style={ styles.userName }
        numberOfLines={ 1 }>{ title }</Span>

      { isAdmin &&
        <Pressable onPress={ () => setIsActive(true) } style={ styles.pen }>
          <PenLineIcon />
        </Pressable>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontFamily: FONTS['700'],
    fontWeight: '700',
    maxWidth: SCREEN_WIDTH - (SCREEN_WIDTH/2),
    fontSize: 18,
  },
  button: {
    marginLeft: 10,
  },
  pen: {
    marginLeft: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ECEBEB',
  },
});

export default TitleChangeable;
