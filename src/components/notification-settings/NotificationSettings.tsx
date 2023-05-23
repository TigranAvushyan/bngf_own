import React, { FC } from 'react';
import Span from '../ui/span/Span';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../style/global.style';

interface Durations {
  text: string,
  hour: number,
}

const getNotificationState = (isDisabled: boolean): Durations[] => {
  if (isDisabled) {
    return [{
      text: 'Включить',
      hour: 0,
    }];
  }
  return [
    {
      text: 'Отключить на 1 час',
      hour: 1,
    },
    {
      text: 'Отключить на 8 часов',
      hour: 8,
    },
    {
      text: 'Отключить на 7 дней',
      hour: 168,
    },
    {
      text: 'Отключить на 14 дней',
      hour: 336,
    },
    {
      text: 'Отключить',
      hour: 24 * 365 * 100,
    },
  ];
};

interface NotificationSettingsProps {
  onSelectHour: (hour: number) => void;
  isDisabled: boolean
}

const NotificationSettings: FC<NotificationSettingsProps> = ({ onSelectHour, isDisabled }) => {
  return (
    <View style={ styles.container }>
      <Span style={ styles.title }>Уведомления</Span>
      {
        getNotificationState(isDisabled).map((item, idx) => (
          <TouchableOpacity
            key={ idx }
            onPress={ () => onSelectHour(item.hour) }
            style={ styles.selectionTime }>
            <Span style={ styles.selectionTimeText }>{ item.text }</Span>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontFamily: FONTS['700'],
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 10,
  },
  selectionTime: {
    paddingVertical: 10,
  },
  selectionTimeText: {
    fontFamily: FONTS['600'],
    fontWeight: '600',
    fontSize: 14,
  },
});

export default NotificationSettings;
