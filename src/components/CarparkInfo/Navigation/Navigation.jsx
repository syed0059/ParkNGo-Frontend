import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useEffect, useState, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { REACT_APP_GOOGLE_API_KEY } from "@env"

export default function Navigation(props) {
  const address = props.address;
  const coordinates = props.coordinates;
  // console.log(coordinates);
  // should be stored in longitude and latitude, can check the console log

  const [origin, setOrigin] = useState();

  //Sets Destination location
  const [destination, setDestination] = useState({
    latitude: coordinates[1],
    longitude: coordinates[0],
  });
  console.log(destination);

  //Sets Origin location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setOrigin({
            latitude: 1.3478769602767113,
            latitudeDelta: 0.008540807106718562,
            longitude: 103.68278687819839,
            longitudeDelta: 0.008127428591251373,
          });
          console.error("Location permission not granted");
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
        });

        console.log("Got Location");
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
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            strokeColor="#53ae31"
            strokeWidth={8}
            destination={destination}
            apikey={String(REACT_APP_GOOGLE_API_KEY)}
          />
        ) : null}

        <Marker pinColor={"red"} coordinate={destination} />
      </MapView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Directing you to: {address}</Text>
        <Button
          mode="contained"
          onPress={props.onClose}
          style={styles.button}
          buttonColor="#AF1B3F"
        >
          End Navigation
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#464B76",
  },
  headerText: {
    fontSize: 25,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: "bold",
    color: "#F0F2EF",
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
  },
  map: {
    flex: 1,
  },
});
