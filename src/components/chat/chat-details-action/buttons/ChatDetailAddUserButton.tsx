import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import PlusIcon from '../../../ui/icons/plus/PlusIcon';
import Span from '../../../ui/span/Span';
import styles from '../chatDetailActionStyle';
import { Screens } from '../../../../navigators/main/MainParamList';


interface ChatDetailAddUserPropsType {
  navigate: any
}

const ChatDetailAddUserButton: FC<ChatDetailAddUserPropsType> = ({ navigate }) => {
  return (
    <Pressable onPress={ () => navigate(Screens.ADD_USER_CURRENT_GROUP, { fromRout: Screens.CHAT_DETAILS }) } style={ styles.event }>
      <View style={ styles.eventIcon }>
        <PlusIcon />
      </View>
      <Span>Добавить</Span>
    </Pressable>
  );
};

export default ChatDetailAddUserButton;
