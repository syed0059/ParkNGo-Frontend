import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  Divider,
  ProgressBar,
  Text,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import Sort from "./Sort";
const carparkInterface = require("../../carparkInterface/carparkInterface");
import { calculateDistance } from "../CalculateDistance";
import { sortCarparks } from "../SortCarparks";
import FavouritesContext from "../FavouritesContext";
import CarparkInfo from "../CarparkInfo/CarparkInfo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";

export default function Favourites({ location }) {
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
  const { favourites, toggleFavourites } = useContext(FavouritesContext);

  // GET CARPARK
  const [carparks, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCarparks = async () => {
      if (location) {
        try {
          setLoading(true); // Set loading true at the beginning of the data fetching
          // get carparks nearby
          const favouriteCarparks = await carparkInterface.getFavourites();
          const carparks = await carparkInterface.getCarparksByIdArray(
            favouriteCarparks
          );
          // Calculate the distance from current location to carpark
          const carparksWithDistance = Object.values(carparks).map(
            (carpark) => {
              const [longitude, latitude] = carpark.Coordinates.coordinates;
              const distance = calculateDistance(
                // Current location
                location.latitude,
                location.longitude,
                // Carpark Location
                latitude,
                longitude
              );
              // Set random availability
              const randomProgress = Math.random();
              return { ...carpark, distance, progress: randomProgress };
            }
          );
          // set carparks
          setData(carparksWithDistance);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCarparks();
  }, [location, favourites]); // The useEffect will rerun whenever userLocation changes

  const [sortOption, setSortOption] = useState("distance");
  const [sortedCarparks, setSortedCarparks] = useState(carparks);
  useEffect(() => {
    const sortedData = sortCarparks(carparks, sortOption);
    setSortedCarparks(sortedData);
  }, [carparks, sortOption]);

  //Select carpark
  const [selectedCarpark, setSelectedCarpark] = useState(null);
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
              console.log("selected");
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
