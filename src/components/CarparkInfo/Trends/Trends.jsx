import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import Carousel from "react-native-reanimated-carousel";
import { trimEnd } from "lodash";
import getTrend from "./TrendInterface";

function formatHours(hour) {
  if (hour >= 24) {
    hour -= 24;
  }
  if (hour > 12) {
    hour -= 12;
  }
  return hour;
}

function twentyFourFormat(hour) {
  if (hour >= 24) {
    hour -= 24;
  }
  return hour;
}

export default function Trends(props) {
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
  if (hour < 3) {
    hour += 24;
  }
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        if (props.carparkID) {
          const pull = await getTrend(props.carparkID);
          if (pull) {
            console.log("Trends pulled here.");
          }
          if (pull && !pull.error) {
            setData(pull);
          } else {
            setHasError(true);
          }
        }
      } catch (error) {
        console.error("Error found under trends.jsx: " + error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends();
  }, [props.carparkID]);

  function scopedTrend(day) {
    var scoped = [];
    if (!hasError) {
      for (let i = 0; i < 7; i++) {
        scoped[i] = data[days[day]][twentyFourFormat(hour - 3 + i).toString()];
      }
      return scoped;
    }
    return [];
  }
  if (isLoading) {
    return (
      <View style={curStyles.centerContent}>
        <ActivityIndicator size="large" />
        <Text>Loading trends...</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={curStyles.centerContent}>
        <Text>Failed to get trends.</Text>
      </View>
    );
  }

  if (data) {
    return (
      <Carousel
        loop
        width={Dimensions.get("window").width - 90}
        height={Dimensions.get("window").width * 0.65}
        data={[1, 2, 3, 4, 5, 6, 7]}
        scrollAnimationDuration={500}
        defaultIndex={day}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View style={curStyles.content}>
            <Text> {"<          " + days[index] + "          >"}</Text>
            <VerticalBarGraph
              data={scopedTrend(index)}
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
                hasXAxisLabels: true,
              }}
              style={curStyles.trends}
            />
          </View>
        )}
      />
    );
  } else {
    return (
      <View style={curStyles.centerContent}>
        <Text>No data available.</Text>
      </View>
    );
  }
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
  centerContent: {
    justifyContent: "center",
  },
});
