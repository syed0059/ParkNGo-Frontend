import React from "react";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";
import Carousel from "react-native-reanimated-carousel";

export default function Trends() {
  const day = "<      Monday      >";
  return (
    <View style={curStyles.container}>
      <Card>
        <Card.Title title="Past Trends" />
        <Card.Content style={curStyles.content}>
          <View style={curStyles.content}>
            <Carousel
              loop
              width={Dimensions.get("window").width - 90}
              pagingEnabled={true}
              height={Dimensions.get("window").width * 0.65}
              data={[...new Array(6).keys()]}
              scrollAnimationDuration={500}
              onSnapToItem={(index) => console.log("current index:", index)}
              renderItem={({ index }) => (
                <View style={curStyles.content}>
                  <Text> {day}</Text>
                  <VerticalBarGraph
                    data={[20, 45, 28, 80, 99, 43, 50]}
                    labels={["1", "2", "3", "4", "5", "6", "7"]}
                    width={Dimensions.get("window").width * 0.8}
                    height={Dimensions.get("window").width / 2}
                    barRadius={5}
                    barWidthPercentage={0.5}
                    barColor="#53ae31"
                    baseConfig={{
                      hasXAxisBackgroundLines: false,
                      hasXAxisLabels: false,
                    }}
                    style={curStyles.trends}
                  />
                </View>
              )}
            />
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
