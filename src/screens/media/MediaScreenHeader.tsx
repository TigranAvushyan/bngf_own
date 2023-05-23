import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Screens } from '../../navigators/main/MainParamList';
import ArrowIcon from '../../components/ui/icons/arrows/ArrowIcon';
import Span from '../../components/ui/span/Span';
import { FONTS } from '../../style/global.style';
import { useMainNavigation } from '../../lib/hooks/navigation/useNavigation';
import moment from 'moment';
import { fromNow } from '../../lib/utils';
import { colors } from '../../style/colors';
import { Time } from '../../lib/types';

interface MediaScreenHeaderProps {
  name: string,
  date:Time
}

const MediaScreenHeader: FC<MediaScreenHeaderProps> = ({ name, date }) => {
  const { goBack } = useMainNavigation();


  return (
    <View style={ styles.container }>
      <Pressable style={ styles.back } onPress={ goBack }>
        <ArrowIcon color={ colors.DARK } />
      </Pressable>
      <View style={ styles.text }>
        <Span style={ styles.name }>{ name }</Span>
        <Span style={ styles.sendTime }>Отправлено { fromNow(date) } в { moment(date).format('HH:mm') }</Span>
      </View>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  back: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  text: {
    alignItems: 'center',
  },
  name: {
    color: '#17303F',
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 16,
  },
  sendTime: {},

});


export default MediaScreenHeader;
