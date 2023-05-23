import React from 'react';
import LoadApp from './src/components/load-app/LoadApp';
import moment from 'moment';
import usePushNotification from './src/lib/hooks/notification/usePushNotification';
import * as Notifications from 'expo-notifications';
moment.locale('ru', {
  months: [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
  ],
  weekdays: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  usePushNotification();

  return (
    <>
      <LoadApp />
    </>
  );
};
export default App;

