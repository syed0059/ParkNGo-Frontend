import { View, Text, StyleSheet } from "react-native";

export default function PricesContent(props) {
  console.log("PriceContent gets Prices: " + props.priceInfo);
  // console.log(props.priceInfo["weekdayRate1"]);
  // console.log(props.priceInfo["weekdayRate2"]);
  // console.log(props.priceInfo["saturdayRate"]);
  // console.log(props.priceInfo["sundayPublicHolidayRate"]);
  let carPrices =
    "Car: 7.00am to 10:30pm: $0.60 / 30min \n\n10.30pm to 7.00am: $0.60 / 30min \n\nParking from 10.30pm to 7.00am capped at $5\n";
  let motorcyclePrices =
    "Motorcycle: 7.00am to 10:30pm: $0.20 / 30min \n\n10.30pm to 7.00am: $0.20 / 30min \n\nSession is capped at $0.65 per lot\n";
  let terms = "Per minute charging";
  if (
    props.carparkType == "LTA Carpark" ||
    props.carparkType == "URA Carpark"
  ) {
    carPrices = motorcyclePrices =
      "Unavailable for " + props.carparkType + "s.\n\n";
    terms = "This feature is being looked into.";
  }
  return (
    <View>
      <Text style={curstyles.main}>Free Parking: {props.freeParking}</Text>
      <Text />
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
  main: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
