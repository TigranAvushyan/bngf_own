import React from 'react';
import Span from '../span/Span';
import { FONTS } from '../../../style/global.style';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../style/colors';

interface MessageItemActionProps {
  text: string | null
}

const MessageItemAction = ({ text }: MessageItemActionProps) => {
  return (
    <View style={styles.actionItemContainer}>
      <Span style={
        { color: colors.PEN_LINE_ICON,
          fontFamily: FONTS['600'],
          textAlign: 'center',
        }
      }>{text}</Span>
    </View>
  );
};

const styles = StyleSheet.create({
  actionItemContainer: {
    alignItems: 'flex-end',
    zIndex: 110,
    alignSelf: 'center',
    backgroundColor: colors.MESSAGE_ACTION_BACKGROUND,
    paddingHorizontal: 8,
    borderRadius: 6,
    paddingVertical: 2,
  },
});

export default MessageItemAction;
