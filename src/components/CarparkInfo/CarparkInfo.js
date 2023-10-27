import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import CarparkAvailability from "./Availability/CarparkAvailability";
import Prices from "./Prices/Prices";
import Trends from "./Trends/Trends";
import Navigation from "./Navigation/Navigation";
const carparkInterface = require('../../carparkInterface/carparkInterface');


function CarparkInfo({ selectedCarparkID }) {

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

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCarpark = async () => {
      try {
        if (selectedCarparkID) { // Check if selectedCarparkID is available
          setLoading(true);
          const carpark = await carparkInterface.getCarparkById(selectedCarparkID);
          setData(carpark);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCarpark();
  }, [selectedCarparkID]);

  function getContent() {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    else {
      return (
        <View style={styles.carparkContent}>
          <View style={styles.headerContainer}>
            <Text variant="headlineLarge" style={styles.texts}>
              {data.Address}
            </Text>
            <Text variant="titleSmall" style={styles.texts}>
              {formatString(data.CarparkType)}
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

