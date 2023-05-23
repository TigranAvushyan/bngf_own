import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Subscription } from 'expo-modules-core';
import { Notification } from 'expo-notifications/src/Notifications.types';
import db from '../../db/db';
import { useStore } from 'effector-react';
import { $isAuth } from '../../../store/auth/authStore';
import { Platform } from 'react-native';


const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const dbExpoToken = await db.get(db.fields.EXPO_TOKEN);
    if (dbExpoToken) return;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('EXPO Token: ', token);
    await db.set(db.fields.EXPO_TOKEN, token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

const usePushNotification = () => {
  const [notification, setNotification] = useState<Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();


  const isAuth = useStore($isAuth);


  useEffect(() => {
    if (!isAuth) {
      registerForPushNotificationsAsync();
    }
  }, [isAuth]);

  useEffect(() => {
    registerForPushNotificationsAsync()
        .then()
        .catch();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(setNotification);

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('notification Response: ', response);
    });

    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
};

export default usePushNotification;
