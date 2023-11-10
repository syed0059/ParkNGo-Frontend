import React, { createContext, useState, useEffect } from 'react';
const notificationInterface = require('../notificationInterface/notificationInterface');
const carparkInterface = require('../carparkInterface/carparkInterface');
import * as Notifications from 'expo-notifications';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const scheduleNotification = async (carparkId) => {
    // console.log(carparkId, "cpID");
    const carparks = await carparkInterface.getCarparksByIdArray([carparkId.toString()]);
    const carparkData = carparks[carparkId];
    // console.log(carparkData);
    // Make sure carparkData is not undefined before scheduling the notification
    if (carparkData) {
      const carAvailability = carparkData.availability.car.availability || 0;
      const motorcycleAvailability = carparkData.availability.motorcycle.availability || 0;
      const totalAvailability = carAvailability + motorcycleAvailability;
      const notificationIdentifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: `${carparkData.Address}`,
          body: `Current Availability: ${totalAvailability}!`,
          data: carparkData, // Include the entire carparkData object if necessary
        },
        /*trigger: {
          seconds: 60,
          repeats: false,
        },*/
        trigger: null,
      });
      return { carparkId, identifier: notificationIdentifier };
    } else {
      // Handle the case where the carparkData is undefined (e.g., carparkId not found)
      console.error('Carpark data not found for id:', carparkId);
      return null;
    }
  };

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const noti = await notificationInterface.getNotificationList();
      setNotification(noti);
      // console.log(noti, "inital noti");
    };

    loadNotifications();
  }, []);

  const toggleNotifications = async (carparkId) => {
    const idString = carparkId.toString();
    // console.log(idString, "noti selected");
    // Check if the carparkId is already in the notifications array
    const isNotified = notification.find(noti => noti.carparkId === carparkId);

    let updatedNotifications;
    if (isNotified) {
      // Cancel Notification
      await Notifications.cancelScheduledNotificationAsync(isNotified.identifier);
      // Remove the carparkId from notifications
      updatedNotifications = notification.filter(noti => noti.carparkId !== carparkId);
      await notificationInterface.removeFromNotificationList(idString);
    } else {
      // Schedule the notification and get the identifier
      const newNotification = await scheduleNotification(carparkId);
      // Add the carparkId to notifications
      updatedNotifications = [...notification, newNotification];
      await notificationInterface.addToNotificationList(idString);
    }

    // Update notification after toggling
    // console.log(updatedNotifications, "updated noti");
    setNotification(updatedNotifications);
  };

  return (
    <NotificationContext.Provider value={{ notification, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
