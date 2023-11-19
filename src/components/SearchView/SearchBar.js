import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
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
import { sortCarparks } from "../../searchManager/SortCarparks";
import FavouritesContext from "../../favouritesManager/FavouritesContext";
import "react-native-gesture-handler";
import ActiveSearchContext from "../../searchManager/ActiveSearchContext";
import { useIsFocused } from "@react-navigation/native";
import { MapCenterToPin } from "../../mapViewManager/MapCenterToPinContext";

export default function SearchBar({
  location,
  searchLoading,
  searchCarparks,
  selecting,
}) {
  const { mapCenterToPin, setMapCenterToPin } = useContext(MapCenterToPin);
  const { setSearchActive } = useContext(ActiveSearchContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    setSearchActive(isFocused);
  }, [isFocused, setSearchActive]);

  const [selectedCarpark, setSelectedCarpark] = useState(null);

  const [sortOption, setSortOption] = useState("distance");
  const [sortedLists, setSortedLists] = useState({
    distance: [],
    availability: [],
    price: [],
  });
  const [sortedCarparks, setSortedCarparks] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  // Compute all sorted lists whenever the list of carparks changes
  useEffect(() => {
    setIsSorting(true);

    const distanceSorted = sortCarparks(searchCarparks, "distance");
    const availabilitySorted = sortCarparks(searchCarparks, "availability");
    const priceSorted = sortCarparks(searchCarparks, "price");

    setSortedLists({
      distance: distanceSorted,
      availability: availabilitySorted,
      price: priceSorted,
    });

    setIsSorting(false);
  }, [searchCarparks]);

  // Update the sortedCarparks based on the selected sort option
  useEffect(() => {
    setSortedCarparks(sortedLists[sortOption]);
  }, [sortOption, sortedLists]);

  const { favourites, toggleFavourites } = useContext(FavouritesContext);

  const getProgressBarColor = (progress) => {
    if (progress < 0.1) {
      return "red";
    } else if (progress < 0.3) {
      return "yellow";
    } else {
      return "green";
    }
  };

  if (searchLoading || isSorting) {
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
              // handlePresentModalPress();
              selecting(item);
              setMapCenterToPin({
                latitude: item.Coordinates.coordinates[1],
                longitude: item.Coordinates.coordinates[0],
              });
            }}
          >
            <View style={styles.listItem}>
              <View style={styles.availableCarparks}>
                <Text variant="labelLarge" style={styles.availableCarparksText}>
                  {Math.abs(item.tAvail)}
                </Text>
                <ProgressBar
                  progress={Math.abs(item.progress)}
                  color={getProgressBarColor(Math.abs(item.progress))}
                  style={styles.progress}
                />
              </View>
              <View style={styles.textContainer}>
                <Text variant="labelLarge">{item.Address}</Text>
                <Text variant="bodySmall">{item.distance.toFixed(2)} km</Text>
              </View>
              <IconButton
                icon={
                  favourites.includes(item.CarparkID)
                    ? "heart"
                    : "heart-outline"
                }
                iconColor={
                  favourites.includes(item.CarparkID) ? "blue" : "black"
                }
                size={24}
                onPress={() => toggleFavourites(item.CarparkID)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
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
  availableCarparks: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 10,
  },
  availableCarparksText: {
    color: "black",
    textAlign: "center",
    marginBottom: 5,
  },
  availableCarparks: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 10,
  },
  availableCarparksText: {
    color: "black",
    textAlign: "center",
    marginBottom: 5,
  },
});
