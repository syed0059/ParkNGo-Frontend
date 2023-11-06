import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import CarparkAvailability from "./Availability/CarparkAvailability";
import Prices from "./Prices/Prices";
import TrendsContainer from "./Trends/TrendsContainer";
import Navigation from "./Navigation/Navigation";
const carparkInterface = require("../../carparkInterface/carparkInterface");
import { formatString } from "../formatString";
import PriceCalculator from "./Prices/PriceCalculator";

function CarparkInfo({ carpark }) {
  console.log(carpark);
  selectedCarparkID = carpark.selectedCarpark;
  /* can adapt this to get trends */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCarpark = async () => {
      try {
        if (selectedCarparkID) {
          // Check if selectedCarparkID is available
          setLoading(true);
          const carpark = await carparkInterface.getCarparkById(
            selectedCarparkID
          );
          setData(carpark);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarpark();
  }, [selectedCarparkID]);
  console.log("Carpark info's data:" + data);

  function getContent() {
    return (
      <ScrollView>
        <TouchableOpacity>
          <TouchableWithoutFeedback>
            <View style={styles.carparkContent}>
              <View style={styles.headerContainer}>
                <Text variant="headlineLarge" style={styles.texts}>
                  {formatString(carpark["Address"])}
                </Text>
                <Text variant="titleSmall" style={styles.texts}>
                  {formatString(carpark["CarparkType"]) +
                    ", " +
                    carpark["distance"].toFixed(2) +
                    "km away"}
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
              <CarparkAvailability
                carSet={carpark["availability"]["car"]}
                motorSet={carpark["availability"]["motorcycle"]}
              />
              <Prices
                freeParking={carpark["FreeParking"]}
                carparkType={carpark["CarparkType"]}
                onPress={pricePress}
              />
              <TrendsContainer carparkID={carpark["CarparkID"]} />
              <Modal isVisible={naviModalVisible} style={styles.modal}>
                <Navigation
                  onClose={() => setNaviVisible(false)}
                  coordinates={carpark["Coordinates"]["coordinates"]}
                  address={formatString(carpark["Address"])}
                />
              </Modal>
              <Modal isVisible={priceModalVisible} onBackdropPress={closePrice}>
                <View style={styles.priceModal}>
                  <PriceCalculator rates={carpark["Rates"]} />
                  <Button
                    mode="contained"
                    buttonColor="#464B76"
                    style={styles.button}
                    onPress={closePrice}
                  >
                    Close
                  </Button>
                </View>
              </Modal>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const [naviModalVisible, setNaviVisible] = useState(false);
  const onClick = () => {
    setNaviVisible(true);
  };
  const [priceModalVisible, setPriceVisible] = useState(false);
  const pricePress = () => {
    setPriceVisible(true);
  };
  const closePrice = () => {
    setPriceVisible(false);
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
    marginBottom: 30,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  headerContainer: {
    justifyContent: "center",
    paddingTop: 5,
    color: "#F0F2EF",
  },
  texts: {
    fontWeight: "bold",
    textAlign: "auto",
    margin: 10,
  },
  cardContainer: {
    flex: 1,
  },
  button: {
    margin: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  priceModal: {
    backgroundColor: "#F0F2EF",
    borderRadius: 30,
    justifyContent: "flex-start",
  },
});

export default CarparkInfo;
