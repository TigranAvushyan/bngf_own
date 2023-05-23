import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SCREEN_PADDING } from '../../style/global.style';
import { $messageBackdrop, $messageBackdropProps, hideMessageBackdrop } from '../../store/ui/backdrop/backdrop';
import { useStore } from 'effector-react/effector-react.cjs';
import MessageItemView from './MessageItemView';
import { getBackdropModalPosition } from '../../lib/utils/ui/message/messageUtils';
import MessageBackdropItems from './message-backdorp-items/MessageBackdropItems';
import { colors } from '../../style/colors';
import { setActiveMessage } from '../../store/message/messageBackdropStore';


const MessageBackdrop = () => {
  const [messageItemHeight, setMessageItemHeight] = React.useState(0);


  const props = useStore($messageBackdropProps);


  const showBackdrop = useStore($messageBackdrop);

  if (props?.messageItem.type === 'Action') return null;

  if (props) {
    return <Modal
      transparent={ true }
      visible={ showBackdrop }
      onDismiss={ hideMessageBackdrop }
    >
      <Pressable onPress={ () => {
        setActiveMessage(null);
        hideMessageBackdrop();
      } } style={ styles.modalBackground }>

        <View style={ { marginTop: props.absoluteTop, paddingHorizontal: SCREEN_PADDING } }>
          <View onLayout={ (e) => setMessageItemHeight(e.nativeEvent.layout.height) }>
            <MessageItemView messageItem={ props.messageItem } />
          </View>

          <View style={ [
            styles.messageItems,
            getBackdropModalPosition(props.absoluteTop, messageItemHeight),
            { opacity: messageItemHeight > 0 ? 1 : 0 }] }>

            <MessageBackdropItems />

          </View>
        </View>

      </Pressable>
    </Modal>;
  }
  return null;
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: colors.BACKDROP_BACKGROUND_COLOR,
    flex: 1,
  },
  messageItems: {
    position: 'absolute',
    paddingHorizontal: 18,
    backgroundColor: colors.BACKDROP_POPUP_BACKGROUND,
    alignSelf: 'flex-end',
    right: 36 + SCREEN_PADDING,
    borderRadius: 16,
  },
});

export default MessageBackdrop;
