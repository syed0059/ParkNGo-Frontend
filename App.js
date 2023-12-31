import React, { useState, useEffect } from "react";
import AppWrapper from "./AppWrapper";
import { MapCoordinates } from "./src/mapViewManager/MapCoordinatesContext"
import { MapSearchCoordinates } from "./src/mapViewManager/MapSearchContext";
import { MapCenterToPin } from "./src/mapViewManager/MapCenterToPinContext";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import ActiveSearchContext from "./src/searchManager/ActiveSearchContext";

export default function App() {

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Please allow notifications in settings to receive notifications from us!');
        return;
      }
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  // Call this function in useEffect
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 1.3478769602767113,
    longitude: 103.68278687819839,
    longitudeDelta: 0.008127428591251373,
    latitudeDelta: 0.008540807106718562,
  })
  const [mapSearchCoordinates, setMapSearchCoordinates] = useState({})
  const [mapCenterToPin, setMapCenterToPin]=useState({})
  

  const [isSearchActive, setSearchActive] = useState(false);

  return (
    <MapCoordinates.Provider value={{ mapCoordinates, setMapCoordinates }}>
      <MapSearchCoordinates.Provider value={{ mapSearchCoordinates, setMapSearchCoordinates }}>
        <MapCenterToPin.Provider value={{ mapCenterToPin, setMapCenterToPin }}>
          <ActiveSearchContext.Provider value={{ isSearchActive, setSearchActive }}>
            <AppWrapper />
          </ActiveSearchContext.Provider>
        </MapCenterToPin.Provider>
      </MapSearchCoordinates.Provider>
    </MapCoordinates.Provider>
  );
}
