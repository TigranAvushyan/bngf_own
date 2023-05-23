import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Span from '../span/Span';
import { FONTS } from '../../../style/global.style';
import { $activeMessage, setVisibleReplyMessageQuote } from '../../../store/message/messageBackdropStore';
import { useStore } from 'effector-react';
import CrossIcon from '../icons/cross/CrossIcon';
import { colors } from '../../../style/colors';
import RoundedArrowIcon from '../icons/arrows/RoundedArrowIcon';


const ReplyMessageQuote = () => {
  const activeMessage = useStore($activeMessage);
  const onClose = () => {
    setVisibleReplyMessageQuote(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <RoundedArrowIcon width={15} height={14}/>
      </View>


      <View style={styles.contentContainer}>
        <Span
          style={styles.title}>
          Ответить {activeMessage?.messageItem.bitrix_user.first_name}
        </Span>
        <Span
          numberOfLines={1}>
          {activeMessage?.messageItem.parents?.length ? 'Пересланное сообщение' : null}
          {activeMessage?.messageItem.text ? activeMessage?.messageItem.text : null}
          {activeMessage?.messageItem.media && activeMessage?.messageItem?.media?.length > 0 ? 'Фотография(ии)' : null}
          {activeMessage?.messageItem.file && activeMessage?.messageItem?.file?.length > 0 ? 'Документ' : null}
          {activeMessage?.messageItem.audio && activeMessage?.messageItem?.audio?.length > 0 ? 'Голосовое сообщение' : null}
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

export default ReplyMessageQuote;
