import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import CarparkAvailability from "./Availability/CarparkAvailability";
import Prices from "./Prices/Prices";
import Trends from "./Trends/Trends";
import Navigation from "./Navigation/Navigation";

function CarparkInfo({ onClose }) {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setReponse] = useState();
  let name, type;
  //http://127.0.0.1:3000/carpark/all//
  useEffect(() => {
    fetch("http://10.91.35.164:3000/carpark/all")
      .then((response) => response.json())
      .then((result) => {
        setReponse(result);
        setIsLoading(false);
      })
      .catch(function (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      });
  }, []);

  function formatString(string) {
    words = string.toLowerCase().split(" ");
    result = "";
    for (i = 0; i < words.length; i++) {
      word = words[i];
      first = word.charAt(0).toUpperCase();
      formattedword = first + word.slice(1);
      result = result + formattedword + " ";
    }
    return result.trim();
  }

  function getContent() {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    if (error) {
      return <Text>{error}</Text>;
    } else {
      name = formatString(response[0]["Address"]);
      type = formatString(response[0]["CarparkType"]);
      return (
        <View style={styles.carparkContent}>
          <View style={styles.headerContainer}>
            <Text variant="headlineLarge" style={styles.texts}>
              {name}
            </Text>
            <Text variant="titleSmall" style={styles.texts}>
              {type}
            </Text>
          </View>
          <Button
            mode="contained"
            buttonColor="#464B76"
            style={styles.button}
            onPress={onClick}
          >
            Directions
          </Button>

          <Modal isVisible={naviModalVisible} style={styles.modal}>
            <Navigation onClose={() => setNaviVisible(false)} />
          </Modal>

          <CarparkAvailability />
          <Prices />
          <Trends />
        </View>
      );
    }
  }

  const [naviModalVisible, setNaviVisible] = useState(false);
  const onClick = () => {
    setNaviVisible(true);
  };

  return <View style={styles.main}>{getContent()}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
  },
  carparkContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  headerContainer: {
    justifyContent: "center",
    paddingTop: 60,
    color: "#F0F2EF",
  },
  texts: {
    color: "#F0F2EF",
    fontWeight: "bold",
    textAlign: "auto",
    margin: 10,
  },
  cardContainer: {
    flex: 1,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default CarparkInfo;
