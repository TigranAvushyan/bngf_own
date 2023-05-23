import React, { FC } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { CHAT_INPUT_HEIGHT } from '../../style/global.style';


const KeyboardAreaView: FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
      keyboardVerticalOffset={ CHAT_INPUT_HEIGHT + 20 }
    >
      { children }
    </KeyboardAvoidingView>
  );
};

export default KeyboardAreaView;
