import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FONTS, SCREEN_PADDING } from '../../../style/global.style';
import Avatar from '../../ui/avatar/Avatar';
import Span from '../../ui/span/Span';
import CrossIcon from '../../ui/icons/cross/CrossIcon';
import Touchable from '../../ui/touchable/Touchable';
import { $selectedUsers, removeSelectedUser } from '../../../store/chat/createChatStore';
import { useStore } from 'effector-react';
import { BitrixProfile } from '../../../lib/types/user/userType';


const SelectedUsers: FC = () => {
  const users = useStore($selectedUsers);

  const onRemove = (user: BitrixProfile) => {
    removeSelectedUser(user);
  };

  return users ?
      (
          <View style={ styles.container }>
            <FlatList
              style={ styles.flatList }
              keyExtractor={ (_, idx) => idx.toString() }
              data={ users }
              horizontal
              showsHorizontalScrollIndicator={ false }
              renderItem={ ({ item }) => (
                <View style={ styles.user } key={ item.bitrix_id }>
                  <Touchable onPress={ () => onRemove(item) } style={ styles.cancel }>
                    <CrossIcon />
                  </Touchable>
                  <Avatar size={ 58 } uri={ item.avatar } />
                  <Span
                    ellipsizeMode={ 'tail' }
                    numberOfLines={ 2 }
                    style={ styles.name }>{ item.first_name + '\n' + item.last_name }
                  </Span>
                </View>
              ) } />
          </View>
      ) : null;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    marginTop: 7,
    paddingHorizontal: SCREEN_PADDING - 10,
    flexDirection: 'row',
    width: '100%',
  },
  flatList: {
    flex: 1,
  },
  user: {
    position: 'relative',
    marginHorizontal: 10,
    maxWidth: 60,
  },
  name: {
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 12,
    color: '#17303F',
    textAlign: 'center',
  },
  cancel: {
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    right: -3,
    top: -3,
    zIndex: 10,
  },
});

export default SelectedUsers;
