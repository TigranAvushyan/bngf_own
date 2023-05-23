import React, { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../../style/colors';


interface PopupPropsType {
  children?: ReactNode;
  visible: boolean;
  onPressBackground?: () => void;
}


const Popup = ({ children, visible, onPressBackground }: PopupPropsType) => {
  return (
    <Modal
      visible={ visible }
      transparent={ true }
      style={ styles.modal }
      animationType={ 'fade' }
    >
      <Pressable onPress={ onPressBackground } style={ styles.container }>
        <View style={ styles.popup }>
          <View style={ { width: '100%' } }>
            {
              children
            }
          </View>
        </View>
      </Pressable>
    </Modal>

  );
};

const styles = StyleSheet.create({

  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.BACKDROP_BACKGROUND_COLOR,
  },
  popup: {
    width: '70%',
    zIndex: 2,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Popup;
