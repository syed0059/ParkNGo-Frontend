import React, { createContext, useState, useEffect } from 'react';
const notificationInterface = require('../notificationInterface/notificationInterface');

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const noti = await notificationInterface.getNotificationList();
      setNotification(noti);
    };

    loadNotifications();
  }, []);

  const toggleNotifications = async (carparkId) => {
    const idString = carparkId.toString();

    // Check if the carparkId is already in the notifications array
    const isNotified = notification.includes(carparkId);

    let updatedNotifications;
    if (isNotified) {
      // Remove the carparkId from notifications
      updatedNotifications = notification.filter(notiId => notiId !== carparkId);
      await notificationInterface.removeFromNotificationList(idString);
    } else {
      // Add the carparkId to notifications
      updatedNotifications = [...notification, carparkId];
      await notificationInterface.addToNotificationList(idString);
    }

    // Update notification after toggling
    setNotification(updatedNotifications);
  };

  return (
    <NotificationContext.Provider value={{ notification, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;