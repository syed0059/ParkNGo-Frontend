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
import NotificationContext from "../NotificationContext";
import CarparkInfo from "../CarparkInfo/CarparkInfo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import ActiveFavouritesContext from "../ActiveFavouritesContext";
import { useIsFocused } from "@react-navigation/native";

export default function Favourites({ location }) {
  const { setFavouritesActive } = useContext(ActiveFavouritesContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    setFavouritesActive(isFocused);
  }, [isFocused, setFavouritesActive]);

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

  const { notification, toggleNotifications } = useContext(NotificationContext);

  const { favourites, toggleFavourites } = useContext(FavouritesContext);

  // GET CARPARK
  const [rawCarparks, setRawCarparks] = useState([]);
  useEffect(() => {
    const fetchCarparks = async () => {
      if (favourites.length > 0) {
        setLoading(true);
        try {
          const fetchedCarparks = await carparkInterface.getCarparksByIdArray(favourites);
          setRawCarparks(fetchedCarparks);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCarparks();
  }, [favourites]);


  const [carparks, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCarparks = async () => {
      if (location) {
        try {
          setLoading(true); // Set loading true at the beginning of the data fetching
          const carparksWithDistance = rawCarparks.map(
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

              const cAvail = carpark.availability.car.availability || 0;
              const mAvail = carpark.availability.motorcycle.availability || 0;
              const tAvail = cAvail + mAvail;

              const cTotal = carpark.availability.car.total || 0;
              const mTotal = carpark.availability.motorcycle.total || 0;
              const tTotal = cTotal + mTotal;

              let avail = 0;

              if (tTotal != 0) {
                avail = tAvail / tTotal;
              }

              const availabilityPercentage = avail;
              return {
                ...carpark,
                distance,
                progress: availabilityPercentage,
                tAvail,
              };
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
  }, [location, rawCarparks]); // The useEffect will rerun whenever userLocation changes

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

    const distanceSorted = sortCarparks(carparks, "distance");
    const availabilitySorted = sortCarparks(carparks, "availability");
    const priceSorted = sortCarparks(carparks, "price");

    setSortedLists({
      distance: distanceSorted,
      availability: availabilitySorted,
      price: priceSorted,
    });

    setIsSorting(false);
  }, [carparks]);

  // Update the sortedCarparks based on the selected sort option
  useEffect(() => {
    setSortedCarparks(sortedLists[sortOption]);
  }, [sortOption, sortedLists]);

  const getProgressBarColor = (progress) => {
    if (progress < 0.1) {
      return "red";
    } else if (progress < 0.3) {
      return "yellow";
    } else {
      return "green";
    }
  };

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

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  if (loading || isSorting || notification === undefined) {
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
              handlePresentModalPress();
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
                  notification.includes(item.CarparkID)
                    ? "bell"
                    : "bell-outline"
                }
                iconColor={
                  notification.includes(item.CarparkID)
                    ? "blue"
                    : "black"
                }
                size={24}
                onPress={() => toggleNotifications(item.CarparkID)}
              />
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
