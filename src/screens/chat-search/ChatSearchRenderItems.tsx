import { StyleSheet, Text, View } from 'react-native';
import UserItem from '../../components/user/UserItem';
import { fromNow } from '../../lib/utils';
import React from 'react';
import ContactItem from '../../components/contacts/ContactItem';
import ChatItem from '../../components/ui/chat/ChatItem';
import Span from '../../components/ui/span/Span';

export const RenderMessageItem = ({ item }: any) => {
  return (
    <View style={ styles.messageItem }>
      <UserItem
        avatar={item?.bitrix_user?.avatar}
        name={ `${item.bitrix_user.first_name} ${item.bitrix_user.last_name}` }
        bottomSide={ <Text>{ item.text }</Text> }
        rightSide={ <Text>{ fromNow(item.time_send) }</Text> } />
    </View>);
};

export const RenderUserItem = ({ item }: any) => (
  <View>
    <ContactItem user={ item.bitrix } />

  </View>
);


export const RenderChatItem = ({ item }: any) => (
  <View>
    <ChatItem item={item}/>
  </View>
);

export const RenderSectionHeader = ({ section }: any) => (
  <View style={ styles.title }>
    <Span>
      { section.title }
    </Span>
  </View>
);


const styles = StyleSheet.create({
  messageItem: {
    marginRight: 16,
  },
  title: {
    height: 28,
    backgroundColor: '#F6F6F6',
    marginRight: 16,
    justifyContent: 'center',
    color: '#5E637A',
    fontWeight: 'bold',
    paddingLeft: 10,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
});
