import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useEffect, useState, useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions"
import * as Location from 'expo-location';

export default function Navigation(props) {
  const coordinates = props.coordinates;
  // console.log(coordinates);
  // should be stored in longitude and latitude, can check the console log

  const [origin, setOrigin] = useState()
  
  //Sets Destination location
  const [destination, setDestination] = useState({
    latitude: coordinates[1],
    longitude: coordinates[0]
  });
  console.log(destination)

  //Sets Origin location
  useEffect(() => {
    const fetchLocation = async () => { 
      try {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setOrigin({
            latitude: 1.3478769602767113,
            latitudeDelta: 0.008540807106718562,
            longitude: 103.68278687819839,
            longitudeDelta: 0.008127428591251373,
          })
          console.error('Location permission not granted');
          return;
        }
        
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setOrigin({
          latitude: location.coords.latitude,
          latitudeDelta: 0.008540807106718562,
          longitude: location.coords.longitude,
          longitudeDelta: 0.008127428591251373,
        })

        console.log('Got Location');
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={origin}
      >
        {origin != undefined && destination != undefined ?(
          <MapViewDirections
            origin = {origin}
            strokeColor = "blue"
            strokeWidth = {2}
            destination = {destination}
            apikey = {process.env.GOOGLE_API_KEY}
          />
        ) : null}

        <Marker
          pinColor={"red"}
          coordinate={destination}
        />

        <View style={styles.box}>
          <Button
            mode="contained"
            onPress={props.onClose}
            style={styles.button}
            buttonColor="#AF1B3F"
          >
            End Navigation
          </Button>
        </View>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    margin: 20,
    marginBottom: 30,
  },
  box: {
    justifyContent: "flex-start",
  },
  map: {
    flex: 0.8,
    justifyContent: "flex-end",
  },
});
