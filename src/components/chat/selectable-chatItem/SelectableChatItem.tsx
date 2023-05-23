import React, { FC, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { FONTS, SCREEN_PADDING } from '../../../style/global.style';
import CircleTickIcon from '../../ui/icons/tick/CircleTickIcon';
import { useStore } from 'effector-react';
import Hr from '../../ui/hr/Hr';
import Span from '../../ui/span/Span';
import { Chat } from '../../../lib/types/chat/chatType';
import { $selectedChats, toggleSelectedChat } from '../../../store/chat/selectedChats';
import Avatar from '../../ui/avatar/Avatar';
import { colors } from '../../../style/colors';

interface SelectableChatItemProps {
  chatItem: Chat
}

const SelectableChatItem: FC<SelectableChatItemProps> = ({ chatItem }) => {
  const selectedChats = useStore($selectedChats);

  const onSelect = () => {
    if ((selectedChats[0] !== chatItem.id) && selectedChats.length ) return;
    toggleSelectedChat(chatItem.id);
  };

  const isInSelectedChats = useMemo(() => {
    return !!selectedChats.find((id) => id === chatItem.id);
  }, [chatItem, selectedChats]);

  return (
    <Pressable onPress={ onSelect }>
      <View style={ styles.container }>
        <View style={ styles.itemsContainer }>
          <Avatar
            uri={ chatItem.image } />
          <View style={ styles.nameMessage }>
            <Span style={ styles.name }>{ chatItem.title || '' }</Span>
          </View>
        </View>
        {
          isInSelectedChats &&
          <CircleTickIcon style={ styles.selected } />
        }
      </View>
      <Hr
        marginHorizontal={0}
        marginVertical={ 6 } />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  hr: {
    backgroundColor: colors.BORDER_GREY,
    height: 1,
    marginHorizontal: SCREEN_PADDING,
    flex: 1,
  },
  selected: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  itemsContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nameMessage: {
    marginLeft: 8,
    maxWidth: '71%',
    marginRight: 'auto',
  },
  name: {
    fontFamily: FONTS['700'],
    fontSize: 16,
  },
});

export default SelectableChatItem;
