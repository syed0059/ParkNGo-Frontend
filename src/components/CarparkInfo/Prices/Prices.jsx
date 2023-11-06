import React, { useState } from "react";
import { Card, Button, Modal } from "react-native-paper";
import { View, StyleSheet, Text } from "react-native";
import HDBPrices from "./HDBPrices";

export default function Prices(props) {
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title="Prices" />
        <Card.Content>
          <HDBPrices freeParking={props.freeParking} />
          <Button
            mode="contained"
            onPress={props.onPress}
            style={curStyles.button}
            buttonColor="#AF1B3F"
          >
            Caclulate Prices
          </Button>
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
