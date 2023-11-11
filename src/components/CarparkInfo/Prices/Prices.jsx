import React, { useState } from "react";
import { Card, Button, Modal } from "react-native-paper";
import { View, StyleSheet, Text } from "react-native";
import PricesContent from "./PricesContent";

export default function Prices(props) {
  let freeParking = "Unavailable.";
  if (props.freeParking) {
    freeParking = props.freeParking;
  }
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title="Prices" />
        <Card.Content>
          <PricesContent
            freeParking={freeParking}
            carparkType={props.carparkType}
            priceInfo={props.priceInfo}
          />
          {props.carparkType != "URA Carpark" &&
            props.carparkType != "LTA Carpark" && (
              <Button
                mode="contained"
                onPress={props.onPress}
                style={curStyles.button}
                buttonColor="#AF1B3F"
              >
                {"Caclulate Prices (for less than 24 Hours)"}
              </Button>
            )}
        </Card.Content>
      </Card>
    </View>
  );
}

const curStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    margin: 10,
  },
});
