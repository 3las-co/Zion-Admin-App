import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const NotificationHandler: React.FC = () => {
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received:', notification);
      }
    );

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification clicked:', response);
      }
    );

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return null;
};

export default NotificationHandler;