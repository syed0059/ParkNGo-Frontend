import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View, Text } from "react-native";

export default function NearbyPlaces(props) {
  const coordinates = props.coordinates;
  const GOOGLE_API_KEY = "AIzaSyCecXUKFPgmVlihNfz860pxtoCz_gpiCIs";
  console.log(coordinates[0]);
  const [nearbyPlacesPhotos, setNearbyPlacesPhotos] = useState([]);

  const fetchNearbyPlaces = async () => {
    try {
      const requestBody = {
        includedTypes: ["restaurant"], // Modify as needed
        maxResultCount: 20,
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
      console.log(data.places[0]);
      console.log(data.places[0].photos[0].name);
      const testPhoto = fetchPhoto(data.places[0].photos[0].name);
      console.log(testPhoto);

      const placesData = data.places
        .map((place) => {
          return {
            name: place.displayName, // Assuming this is how the name is returned
            photoUrl: place.photos ? place.photos.uri : null,
          };
        })
        .filter((place) => place.photoUrl != null);

      //   setNearbyPlacesPhotos(placesData);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  const fetchPhoto = async (placePhotos) => {
    const apiKey = GOOGLE_API_KEY; // Replace with your API key
    const maxWidth = 400; // You can adjust this value
    const resourceName = placePhotos;
    try {
      const url = `https://places.googleapis.com/v1/${resourceName}/media`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Goog-Api-Key": GOOGLE_API_KEY, // Replace with your API key
        },
      });

      if (!response) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const imageURL = response.url; // This is the URL of the image
      return imageURL;
    } catch (error) {
      console.error("Error fetching place photo:", error);
      return null; // Handle the error as needed
    }
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
      <FlatList
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
    height: 100, // Adjust as needed
  },
  photo: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    margin: 5,
  },
});
