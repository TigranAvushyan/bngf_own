import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Avatar from './Avatar';
import Touchable from '../touchable/Touchable';
import PenLineIcon from '../icons/pen/PenLineIcon';
import { showAvatarSelectImagePopup, toggleAvatarSelectImagePopup } from '../../../store/ui/popup/avatarPopupStore';
import { ref } from 'yup';
import Span from '../span/Span';

interface AvatarChangeablePropsType {
  uri?: string,
  avatarSize?: number,
  isAdminChat?: boolean
}

const AvatarChangeable: FC<AvatarChangeablePropsType> = ({ isAdminChat = true, uri, avatarSize = 60 }) => {
  return (
    <View style={ styles.avatar }>
      <Avatar size={ avatarSize } uri={ uri } />
      { isAdminChat &&
        <Touchable onPress={ () => toggleAvatarSelectImagePopup() } style={ styles.pen }>
          <PenLineIcon />
        </Touchable>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginRight: 20,
  },
  pen: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ECEBEB',
  },
});

export default AvatarChangeable;
