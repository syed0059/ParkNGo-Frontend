import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  Divider,
  ProgressBar,
  Text,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import Sort from "./Sort";
import Modal from "react-native-modal";
import CarparkInfo from "../CarparkInfo/CarparkInfo";
import { sortCarparks } from "../SortCarparks";
const carparkInterface = require("../../carparkInterface/carparkInterface");
import FavouritesContext from "../FavouritesContext";
import { Dimensions } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";

export default function CarparkList({ location, loading, carparks }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState(null);

  const onClick = () => {
    setModalVisible(true);
  };

  const [sortOption, setSortOption] = useState("distance");
  const [sortedCarparks, setSortedCarparks] = useState(carparks);
  useEffect(() => {
    const sortedData = sortCarparks(carparks, sortOption);
    setSortedCarparks(sortedData);
  }, [carparks, sortOption]);

  const { favourites, toggleFavourites } = useContext(FavouritesContext);

  // Bottom Sheet Modal
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "85%"], []);

  // callbacks
  function handlePresentModalPress() {
    bottomSheetModalRef.current?.present();
  }
  // const handlePresentModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Sort
        style={styles.sortStyle}
        onSortOptionChanged={(option) => setSortOption(option)}
      />
      <Divider />
      <FlatList
        style={styles.listStyle}
        data={sortedCarparks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCarpark(item);
              // setModalVisible(true);
              handlePresentModalPress();
            }}
          >
            <View style={styles.listItem}>
              <ProgressBar
                progress={item.progress}
                color="green"
                style={styles.progress}
              />
              <View style={styles.textContainer}>
                <Text variant="labelLarge">{item.Address}</Text>
                <Text variant="bodySmall">{item.distance.toFixed(2)} km</Text>
              </View>
              <IconButton
                icon={favourites[item.CarparkID] ? "heart" : "heart-outline"}
                iconColor={favourites[item.CarparkID] ? "blue" : "black"}
                size={24}
                onPress={() => toggleFavourites(item.CarparkID)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ borderRadius: 20 }}
      >
        <View style={styles.modalContent}>
          <CarparkInfo carpark={selectedCarpark} />
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  progress: {
    width: 30,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  listStyle: {
    flex: 0.7,
  },
  sortStyle: {
    flex: 0.3,
    justifyContent: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
  },
});
