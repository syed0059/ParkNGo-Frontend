import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";

export default function Navigation(props) {
  return (
    <View style={styles.navContent}>
      <Text variant="displayLarge"> TEST </Text>
      <Button
        mode="contained"
        onPress={props.onClose}
        style={styles.button}
        buttonColor="#AF1B3F"
      >
        End Navigation
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  navContent: {
    flex: 1,
    backgroundColor: "#FFFF",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    marginBottom: 30,
  },
});
