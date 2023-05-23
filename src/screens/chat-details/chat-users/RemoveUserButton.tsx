import React, { FC, useState } from 'react';
import DeleteIcon from '../../../components/ui/icons/delete/DeleteIcon';
import Touchable from '../../../components/ui/touchable/Touchable';
import { StyleSheet, View } from 'react-native';
import UserConfirmPopup from '../../../components/popups/UserConfirmPopup';

interface RemoveUserPropsType {
  avatar: string,
  name: string,
  onPressRemoveButton: () => void,
  userConfirmPopupText: string,
}

const RemoveUserButton: FC<RemoveUserPropsType> = ({ avatar, name, onPressRemoveButton, userConfirmPopupText }) => {
  const [visible, setVisible] = useState(false);
  const showPopup = () => {
    setVisible(true);
  };

  const removeUserOnConfirm = () => {
    onPressRemoveButton();
  };

  return (
    <View style={ styles.container }>
      <UserConfirmPopup
        setVisible={ setVisible }
        onConfirm={ removeUserOnConfirm }
        visible={ visible }
        image={ avatar }
        title={ name }
        text={ userConfirmPopupText }
      />


      <Touchable onPress={ showPopup }>
        <DeleteIcon />
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default RemoveUserButton;
