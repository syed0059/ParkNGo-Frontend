import { View, Text, StyleSheet } from "react-native";

export default function PricesContent(props) {
  // console.log("PriceContent gets Prices: " + props.priceInfo);
  // console.log(props.priceInfo["weekdayRate1"]);
  // console.log(props.priceInfo["weekdayRate2"]);
  // console.log(props.priceInfo["saturdayRate"]);
  // console.log(props.priceInfo["sundayPublicHolidayRate"]);
  if (!props) {
    return (
      <View>
        <Text style={curstyles.main}>
          Prices is unavailable - exception raised.
        </Text>
      </View>
    );
  } else if (
    props.carparkType != "LTA Carpark" &&
    props.carparkType != "URA Carpark"
  ) {
    let carPrices =
      "Car: 7.00am to 10:30pm: $0.60 / 30min \n\n10.30pm to 7.00am: $0.60 / 30min \n\nParking from 10.30pm to 7.00am capped at $5\n";
    let motorcyclePrices =
      "Motorcycle: 7.00am to 10:30pm: $0.20 / 30min \n\n10.30pm to 7.00am: $0.20 / 30min \n\nSession is capped at $0.65 per lot\n";
    let terms = "Per minute charging";
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
  } else {
    let weekdayRate1 = props.priceInfo["weekdayRate1"];
    let weekdayRate2 = props.priceInfo["weekdayRate2"];
    let saturdayRate = props.priceInfo["saturdayRate"];
    let sundayPublicHolidayRate = props.priceInfo["sundayPublicHolidayRate"];
    return (
      <View>
        <Text style={curstyles.main}>Free Parking: {props.freeParking}</Text>
        <Text />
        <Text style={curstyles.header}>Weekday Rates:</Text>
        <Text>{weekdayRate1 + "\n"}</Text>
        <Text>{weekdayRate2 + "\n\n"}</Text>
        <Text style={curstyles.header}>Satuday Rates</Text>
        <Text>{saturdayRate + "\n\n"}</Text>
        <Text style={curstyles.header}>Sunday/Public Holiday Rates</Text>
        <Text>{sundayPublicHolidayRate}</Text>
      </View>
    );
  }
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
