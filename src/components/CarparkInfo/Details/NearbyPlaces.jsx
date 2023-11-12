import NearbyPlacesInterface from "./NearbyPlacesInterface";
import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function NearbyPlaces(props) {
  console.log("Nearby Places called");
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title="Nearby Places" />
        <Card.Content style={curStyles.content}>
          <View style={curStyles.content}>
            <NearbyPlacesInterface coordinates={props.coordinates} />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const curStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});
