import React from "react";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import HDBPrices from "./HDBPrices";

export default function Prices() {
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title="Prices" />
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
