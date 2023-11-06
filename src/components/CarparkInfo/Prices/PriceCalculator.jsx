import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import SwitchSelector from "react-native-switch-selector";

function PriceCalculator({ rates }) {
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [departureTime, setDepartureTime] = useState(new Date());
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showChosenArrivalTime, setShowChosenArrivalTime] = useState(false);
  const [showChosenDepartureTime, setShowChosenDepartureTime] = useState(false);
  const [vehicleType, setVehicle] = useState("car");

  const calculatePrice = () => {
    // Dummy calculation logic - replace this with actual logic
    let rate;
    if (vehicleType == "car") {
      rate = 0.6;
    } else {
      rate = 0.2;
    }
    const arrival = new Date(arrivalTime); // convert to date object
    const departure = new Date(departureTime); // convert to date object
    const duration = (departure - arrival) / (1000 * 60 * 30); // duration in 30 min intervals
    const price = duration * rate;
    setCalculatedPrice(price.toFixed(2)); // round to 2 decimal places
  };

  const onArrivalTimeChange = (event, selectedTime) => {
    setShowArrivalPicker(false);
    const currentTime = selectedTime || arrivalTime;
    setArrivalTime(currentTime);
    setShowChosenArrivalTime(true);
    setShowDeparturePicker(true);
  };

  const onDepartureTimeChange = (event, selectedTime) => {
    setShowDeparturePicker(false);
    const currentTime = selectedTime || departureTime;
    setDepartureTime(currentTime);
    setShowChosenDepartureTime(true);
  };

  const arrivalButtonSwap = () => {
    setShowArrivalPicker(!showArrivalPicker);
    if (showDeparturePicker) {
      setShowDeparturePicker(false);
    }
  };

  const departureButtonSwap = () => {
    setShowDeparturePicker(!showDeparturePicker);
    if (showArrivalPicker) {
      setShowArrivalPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Calculate Price</Text>
        <SwitchSelector
          initial={0}
          onPress={(value) => setVehicle(value)}
          hasPadding
          options={[
            { label: "Car", value: "car" },
            { label: "Motorbike", value: "motorbike" },
          ]}
          style={styles.switch}
        />
      </View>
      <Button
        mode="contained"
        buttonColor="#464B76"
        style={styles.button}
        onPress={() => arrivalButtonSwap()}
      >
        Select Arrival Time
      </Button>
      {showArrivalPicker && (
        <DateTimePicker
          testID="arrivalTimePicker"
          value={arrivalTime}
          mode={"time"}
          is24Hour={true}
          display="spinner"
          onChange={onArrivalTimeChange}
        />
      )}
      {showChosenArrivalTime && (
        <Text style={styles.resultText}>Arrival Time:</Text>
      )}
      <Button
        mode="contained"
        buttonColor="#464B76"
        style={styles.button}
        onPress={() => departureButtonSwap()}
      >
        Select Departure Time
      </Button>
      {showDeparturePicker && (
        <DateTimePicker
          testID="departureTimePicker"
          value={departureTime}
          mode={"time"}
          is24Hour={true}
          display="spinner"
          onChange={onDepartureTimeChange}
        />
      )}
      {showChosenDepartureTime && (
        <Text style={styles.resultText}>Departure Time: </Text>
      )}
      <Button
        mode="contained"
        buttonColor="#464B76"
        style={styles.button}
        onPress={calculatePrice}
      >
        Calculate Price
      </Button>

      {calculatedPrice && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Total Price:</Text>
          <Text style={styles.price}>${calculatedPrice}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    marginLeft: 20,
    marginRight: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#464B76",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    width: "100%",
    color: "#333",
  },
  button: {
    margin: 20,
    backgroundColor: "#464B76",
  },
  resultContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    alignSelf: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#AF1B3F", // Using secondary button color for the price
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "auto",
    margin: 20,
    fontSize: 20,
    textAlign: "center",
  },
});

export default PriceCalculator;
