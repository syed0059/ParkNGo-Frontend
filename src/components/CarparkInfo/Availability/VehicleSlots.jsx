import React from "react";
import { Icon, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function VehicleSlots(props) {
  let icon;
  vehicleAvail = Math.abs(props.vehicleAvail);
  vehicleTotal = Math.abs(props.vehicleTotal);
  let showTotal = vehicleAvail + " / " + vehicleTotal;
  if (vehicleTotal == 0) {
    showTotal = "Unavailable";
  }

  function colorCode() {
    let fraction = vehicleAvail / vehicleTotal;
    let color;
    if (fraction < 0.1) {
      color = "#D9534F";
    } else if (fraction < 0.3) {
      color = "#FFC107";
    } else {
      color = "#4CAF50";
    }
    if (vehicleTotal == 0) {
      color = "grey";
    }
    return color;
  }

  if (props.vehicleType === "Car") {
    icon = "car";
  } else {
    icon = "motorbike";
  }

  return (
    <View style={curStyles.container} backgroundColor={colorCode()}>
      <Text style={{ color: "#F0F2EF" }} variant="bodyLarge">
        {props.vehicleType} Slots
      </Text>
      <Icon source={icon} size={40} color={"#F0F2EF"} />
      <Text style={{ color: "#F0F2EF" }} variant="bodyLarge">
        {showTotal}
      </Text>
    </View>
  );
}

const curStyles = StyleSheet.create({
  container: {
    width: "49%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
  },
});
