import React, { Dispatch, FC, SetStateAction } from 'react';
import Popup from '../ui/popup/Popup';
import { StyleSheet, View } from 'react-native';
import Span from '../ui/span/Span';
import Button from '../ui/buttons/Button';
import { buttonBlueStyle, popupStyles } from '../../style/popup';
import { $infoPopupText, hideInfoPopupText } from '../../store/ui/popup/infoPopupStore';
import { useStore } from 'effector-react';


const InfoPopup = () => {
  const infoPopupText = useStore($infoPopupText);

  if (!infoPopupText) return null;


  return (
    <Popup visible={ !!infoPopupText }>
      <View style={styles.container}>
        <Span style={ popupStyles.text }>{ infoPopupText }</Span>
        <Button
          title={ 'Хорошо' }
          onPress={() => hideInfoPopupText() }
          style={ buttonBlueStyle }
        />

      </View>
    </Popup>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});


export default InfoPopup;
