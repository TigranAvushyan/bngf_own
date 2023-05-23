import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { toggleNotificationPopup } from '../../../../store/ui/popup/chatDetailNotificationStore';
import styles from '../chatDetailActionStyle';
import BellIcon from '../../../ui/icons/bell/BellIcon';
import Span from '../../../ui/span/Span';
import BellDisableIcon from '../../../ui/icons/bell/BellDisableIcon';
import { colors } from '../../../../style/colors';

interface ChatDetailNotificationButtonProps {
  isDisabled: boolean;
}

const ChatDetailNotificationButton: FC<ChatDetailNotificationButtonProps> = ({ isDisabled }) => {
  const onPressHandler = React.useCallback(() => {
    toggleNotificationPopup();
  }, []);


  return (
    <Pressable onPress={ onPressHandler } style={ styles.event }>
      <View style={ styles.eventIcon }>
        { isDisabled ?
          <BellDisableIcon color={ colors.SMALT } /> :
          <BellIcon color={ colors.SMALT } /> }
      </View>
      <Span>Звук</Span>

    </Pressable>
  );
};

export default ChatDetailNotificationButton;
