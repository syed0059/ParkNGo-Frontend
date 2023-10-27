import React from "react";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";

export default function Trends() {
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title="Past Trends" />
        <Card.Content>
          <VerticalBarGraph
            data={[20, 45, 28, 80, 99, 43, 50]}
            labels={["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]}
            width={Dimensions.get("window").width - 90}
            height={200}
            barRadius={5}
            barWidthPercentage={0.65}
            barColor="#53ae31"
            baseConfig={{
              hasXAxisBackgroundLines: false,
              xAxisLabelStyle: {
                position: "right",
                prefix: "",
              },
            }}
            style={curStyles.trends}
          />
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
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: Dimensions.get("window").width - 70,
  },
});
