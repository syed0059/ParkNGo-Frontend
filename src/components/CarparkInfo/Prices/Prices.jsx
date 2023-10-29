import React from "react";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import HDBPrices from "./HDBPrices";

export default function Prices() {
  var now = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = days[now.getDay()];
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title={day + "'s Prices"} />
        <Card.Content>
          <HDBPrices />
        </Card.Content>
      </Card>
    </View>
  );
}

const curStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
