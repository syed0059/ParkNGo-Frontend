import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";

export default function Navigation(props) {
  const coordinates = props.coordinates;
  console.log(coordinates);
  // should be stored in longitude and latitude, can check the console log

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
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
