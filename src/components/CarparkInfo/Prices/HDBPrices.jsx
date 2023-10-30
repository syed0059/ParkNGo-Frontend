import { View, Text, StyleSheet } from "react-native";

export default function HDBPrices() {
  const carPrices =
    "7.00am to 10:30pm: $0.60 / 30min \n\n10.30pm to 7.00am: $0.60 / 30min \n\nParking from 10.30pm to 7.00am capped at $5\n";
  const motorcyclePrices =
    "7.00am to 10:30pm: $0.20 / 30min \n\n10.30pm to 7.00am: $0.20 / 30min \n\nSession is capped at $0.65 per lot\n";
  const terms = "Per minute charging";
  return (
    <View>
      <Text style={curstyles.header}>Car:</Text>
      <Text>{carPrices}</Text>
      <Text style={curstyles.header}>Motorcycle:</Text>
      <Text>{motorcyclePrices}</Text>
      <Text style={curstyles.header}>{terms}</Text>
    </View>
  );
}

const curstyles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 15,
  },
});