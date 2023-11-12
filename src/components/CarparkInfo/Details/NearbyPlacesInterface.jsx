import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function NearbyPlacesInterface(props) {
  console.log("Nearby Places Interface called");
  const coordinates = props.coordinates;
  const GOOGLE_API_KEY = "AIzaSyCecXUKFPgmVlihNfz860pxtoCz_gpiCIs";
  console.log(coordinates[0]);
  const [nearbyPlacesPhotos, setNearbyPlacesPhotos] = useState([]);

  const fetchNearbyPlaces = async () => {
    try {
      const requestBody = {
        includedTypes: ["restaurant", "shopping_mall", "supermarket", "park"], // Modify as needed
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude: coordinates[1],
              longitude: coordinates[0],
            },
            radius: 500.0,
          },
        },
      };

      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask": "places.displayName,places.photos",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      // console.log(data.places[0]);
      // console.log(data.places[0].photos[0].name);
      // const testPhoto = fetchPhoto(data.places[0].photos[0].name);
      // console.log(testPhoto);

      const placesData = data.places.map((place) => {
        unavailURL = "https://demofree.sirv.com/nope-not-here.jpg?w=200";
        if (!place.photos) {
          console.log(place.displayName.text);
        }
        return {
          name: place.displayName.text, // Assuming this is how the name is returned
          photoUrl: place.photos
            ? fetchPhoto(place.photos[0]["name"])
            : unavailURL,
        };
      });
      console.log(placesData);

      setNearbyPlacesPhotos(placesData);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  const fetchPhoto = (placePhotos) => {
    const apiKey = GOOGLE_API_KEY; // Replace with your API key
    const maxHeight = 500;
    const maxWidth = 500; // You can adjust this value
    const resourceName = placePhotos;
    // try {
    const url = `https://places.googleapis.com/v1/${resourceName}/media?maxHeightPx=${maxHeight}&maxWidthPx=${maxWidth}&key=${GOOGLE_API_KEY}`;
    return url;
    //   const response = await fetch(url);

    //   if (!response) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    // } catch (error) {
    //   console.error("Error fetching place photo:", error);
    //   return null; // Handle the error as needed
    // }
  };

  useEffect(() => {
    if (coordinates && coordinates.length === 2) {
      fetchNearbyPlaces();
    }
  }, [coordinates]);

  const renderPhotoItem = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.photoUrl }} style={styles.photo} />
      <Text style={styles.photoName}>{item.name}</Text>
    </View>
  );

  const keyExtractor = (item, index) => {
    return item.id || index.toString(); // Assuming `item.id` is a unique identifier
  };

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        data={nearbyPlacesPhotos}
        renderItem={renderPhotoItem}
        horizontal
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 230,
  },
  photo: {
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed

    marginRight: 5,
  },
  photoName: {
    fontSize: 10,
    textAlign: "center",
    width: 200,
  },
});
