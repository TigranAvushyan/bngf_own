import React, { Dispatch, FC, SetStateAction } from 'react';
import Popup from '../ui/popup/Popup';
import Avatar from '../ui/avatar/Avatar';
import Span from '../ui/span/Span';
import { Pressable, StyleSheet, View } from 'react-native';
import Button from '../ui/buttons/Button';
import { buttonBlueStyle, popupStyles } from '../../style/popup';
import CrossIcon from '../ui/icons/cross/CrossIcon';
import { FONTS } from '../../style/global.style';
import { colors } from '../../style/colors';

interface RemoveUserConfirmPopupProps {
  onCancel?: () => void,
  onConfirm: () => void,
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>
  image?: string,
  title?: string,
  textButton?: string,
  text: string
}

const UserConfirmPopup: FC<RemoveUserConfirmPopupProps> = ({
  onConfirm,
  onCancel,
  visible,
  setVisible,
  image,
  title,
  textButton = 'Да',
  text,
}) => {
  const confirmAndClosePopup = () => {
    onConfirm();
    setVisible(false);
  };
  const cancelAndClosePopup = () => {
    if (onCancel) onCancel();
    setVisible(false);
  };

  return (
    <Popup onPressBackground={ cancelAndClosePopup } visible={ visible }>
      <View style={ styles.container }>

        <Pressable style={ styles.cancelButton } onPress={ cancelAndClosePopup }>
          <CrossIcon color={ colors.WHITE } />
        </Pressable>

        { image || title ? <View style={ styles.header }>
          <Avatar uri={ image } />
          <Span numberOfLines={ 1 } style={ styles.title }>{ title }</Span>
        </View> : null }

        <Span style={ popupStyles.text }>
          { text }
        </Span>

        <View style={ styles.buttons }>
          <Button
            onPress={ confirmAndClosePopup }
            style={ buttonBlueStyle }
            title={ textButton }
          />

        </View>


      </View>
    </Popup>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#D6D6D7',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    color: '#17303F',
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 14,
  },
  buttons: {},
});

export default UserConfirmPopup;
