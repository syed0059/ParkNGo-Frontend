import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import VehicleSlots from "./VehicleSlots";

function CarparkAvailability(props) {
  let carAvail, carTotal, motorAvail, motorTotal;
  console.log(props.carSet);
  carAvail = props.carSet["availability"];
  carTotal = props.carSet["total"];
  motorAvail = props.motorSet["availability"];
  motorTotal = props.motorSet["total"];
  return (
    <View style={curStyles.container}>
      <Card style={{ backgroundColor: "#F0F2EF" }}>
        <Card.Title title="Availability" />
        <Card.Content>
          <View style={curStyles.boxes}>
            <VehicleSlots
              vehicleType="Car"
              vehicleAvail={carAvail}
              vehicleTotal={carTotal}
            />
            <VehicleSlots
              vehicleType="Motorcycle"
              vehicleAvail={motorAvail}
              vehicleTotal={motorTotal}
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
  boxes: {
    flexDirection: "row", // Set the direction to row for side-by-side alignment
    justifyContent: "space-between", // Add space between the components
  },
});

export default CarparkAvailability;
