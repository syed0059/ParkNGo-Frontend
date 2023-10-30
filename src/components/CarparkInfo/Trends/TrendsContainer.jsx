import React from "react";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import Carousel from "react-native-reanimated-carousel";
import Trends from "./Trends";

export default function TrendsContainer() {
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title="Past Trends" />
        <Card.Content style={curStyles.content}>
          <View style={curStyles.content}>
            <Trends />
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
  trends: {
    padding: 10,
    paddingTop: 20,
    borderRadius: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});