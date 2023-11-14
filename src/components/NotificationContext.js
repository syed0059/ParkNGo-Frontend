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
    // console.log(carparks, "carparks");
    const carparkData = carparks[0];
    // console.log(carparkData, "carparkData");
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
      console.log('Carpark data not found for id:', carparkId);
      return null;
    }
  };

  // State for storing only the carparkIds
  const [notification, setNotification] = useState([]);

  // State for storing the carparkIds with their respective identifiers
  const [notificationsWithIdentifiers, setNotificationsWithIdentifiers] = useState([]);

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
    // Find the notification object that includes the carparkId
    const notificationObject = notificationsWithIdentifiers.find(noti => noti.carparkId === carparkId);

    // Check if the carparkId is already notified
    const isNotified = notificationObject !== undefined;
    let updatedNotifications;
    let updatedNotificationsWithIdentifiers;

    if (isNotified) {
      // Cancel Notification
      await Notifications.cancelScheduledNotificationAsync(notificationObject.identifier);

      // Remove the carparkId from notifications
      updatedNotifications = notification.filter(id => id !== carparkId);
      updatedNotificationsWithIdentifiers = notificationsWithIdentifiers.filter(noti => noti.carparkId !== carparkId);

      setNotification(updatedNotifications);
      setNotificationsWithIdentifiers(updatedNotificationsWithIdentifiers);

      await notificationInterface.detach(idString);
    } else {
      // Schedule the notification and get the identifier
      const newNotification = await scheduleNotification(carparkId);

      // Add the carparkId to notifications
      updatedNotifications = [...notification, carparkId];
      updatedNotificationsWithIdentifiers = [...notificationsWithIdentifiers, newNotification];

      setNotification(updatedNotifications);
      setNotificationsWithIdentifiers(updatedNotificationsWithIdentifiers);

      await notificationInterface.attach(idString);
    }

    // Update notification after toggling
    // console.log(updatedNotifications, "updated notificationIds");
    // console.log(updatedNotificationsWithIdentifiers, "updated notificationsWithIdentifiers");
  };

  return (
    <NotificationContext.Provider value={{ notification, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
