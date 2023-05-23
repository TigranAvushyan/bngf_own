import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Span from '../span/Span';
import { FONTS } from '../../../style/global.style';
import { $activeMessage, setVisibleEditMessageQuote } from '../../../store/message/messageBackdropStore';
import { useStore } from 'effector-react';
import CrossIcon from '../icons/cross/CrossIcon';
import { colors } from '../../../style/colors';
import PenLineIcon from '../icons/pen/PenLineIcon';


const EditMessageQuote = () => {
  const activeMessage = useStore($activeMessage);

  const onClose = () => {
    setVisibleEditMessageQuote(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <PenLineIcon color={ colors.PEN_LINE_ICON } width={ 15 } height={ 14} />
      </View>
      <View style={styles.contentContainer}>
        <Span
          style={styles.title}>
          Изменить
        </Span>
        <Span>
          {activeMessage?.messageItem.text}
        </Span>
      </View>
      <Pressable
        onPress={ onClose }>
        <View style={ styles.crossIcon }>
          <CrossIcon color={ colors.BLACK } />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.BORDER_GREY,
    backgroundColor: colors.GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    borderRightColor: colors.BORDER_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    marginVertical: 5,
    width: 46,
  },
  crossIcon: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontFamily: FONTS['700'],
    fontWeight: '700',
    color: colors.DARK,
  },
  contentContainer: {
    marginLeft: 10,
    marginVertical: 5,
    width: '80%',
  },
});

export default EditMessageQuote;
