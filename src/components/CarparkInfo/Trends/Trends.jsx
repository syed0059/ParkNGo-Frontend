import React from "react";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import Carousel from "react-native-reanimated-carousel";
import trend from "./trend";
import { trimEnd } from "lodash";

export default function Trends() {
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
  var day = now.getDay();
  var hour = now.getHours();
  function formatHours(hour) {
    if (hour >= 24) {
      hour -= 24;
    }
    if (hour > 12) {
      hour -= 12;
    }
    return hour;
  }
  return (
    <Carousel
      loop
      width={Dimensions.get("window").width - 90}
      height={Dimensions.get("window").width * 0.65}
      data={trend}
      scrollAnimationDuration={500}
      defaultIndex={day}
      onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ index }) => (
        <View style={curStyles.content}>
          <Text> {"<          " + trend[index].day + "          >"}</Text>
          <VerticalBarGraph
            data={trend[index].data}
            labels={[
              formatHours(hour - 3),
              formatHours(hour - 2),
              formatHours(hour - 1),
              formatHours(hour),
              formatHours(hour + 1),
              formatHours(hour + 2),
              formatHours(hour + 3),
            ]}
            width={Dimensions.get("window").width * 0.8}
            height={Dimensions.get("window").width / 2}
            barRadius={5}
            barWidthPercentage={0.5}
            barColor="#464B76"
            baseConfig={{
              hasXAxisBackgroundLines: false,
              hasXAxisLabels: false,
            }}
            style={curStyles.trends}
          />
        </View>
      )}
    />
  );
}

const curStyles = StyleSheet.create({
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
