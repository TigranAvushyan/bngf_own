import React, { FC } from 'react';
import styles from '../chatDetailActionStyle';
import { Pressable, View } from 'react-native';
import UserIcon from '../../../ui/icons/user/UserIcon';
import Span from '../../../ui/span/Span';
import { Screens } from '../../../../navigators/main/MainParamList';

interface ChatDetailAdministratorsButtonPropsType {
  navigate: any;
}

const ChatDetailAdministratorsButton: FC<ChatDetailAdministratorsButtonPropsType> = ({ navigate }) => {
  const onPressHandler = React.useCallback(() => {
    navigate(Screens.ADMINISTRATORS);
  }, []);

  return (
    <Pressable onPress={ onPressHandler } style={ styles.event }>
      <View style={ styles.eventIcon }>
        <UserIcon />
      </View>

      <Span>Права</Span>

    </Pressable>
  );
};

export default ChatDetailAdministratorsButton;
