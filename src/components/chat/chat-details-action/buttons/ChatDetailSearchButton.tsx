import React from 'react';
import { Pressable, View } from 'react-native';
import SearchIcon from '../../../ui/icons/search/SearchIcon';
import Span from '../../../ui/span/Span';
import styles from '../chatDetailActionStyle';
import { Screens } from '../../../../navigators/main/MainParamList';
import { useMainNavigation } from '../../../../lib/hooks/navigation/useNavigation';

interface ChatDetailSearchButtonProps {
  chatId: number;
}

const ChatDetailSearchButton = ({ chatId }: ChatDetailSearchButtonProps) => {
  const { navigate } = useMainNavigation();

  const goBack = () => {
    navigate(Screens.CHAT_SEARCH_MESSAGES_SCREEN, { id: chatId });
  };

  return (
    <Pressable
      onPress={ goBack }
      style={ styles.event }>
      <View style={ styles.eventIcon }>
        <SearchIcon color={ '#003F96' } />
      </View>

      <Span>Поиск</Span>

    </Pressable>
  );
};

export default ChatDetailSearchButton;
