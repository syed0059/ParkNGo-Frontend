import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Divider, ProgressBar, Text, IconButton, ActivityIndicator } from 'react-native-paper';
import Sort from './Sort';
const carparkInterface = require('../../carparkInterface/carparkInterface');
import { calculateDistance } from '../CalculateDistance';
import { sortCarparks } from '../SortCarparks';
import FavouritesContext from '../FavouritesContext';


export default function Favourites({ location }) {

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
          const carparks = await carparkInterface.getCarparksByIdArray(favouriteCarparks);
          // Calculate the distance from current location to carpark
          const carparksWithDistance = Object.values(carparks).map((carpark) => {
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
          });
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

  const [sortOption, setSortOption] = useState('distance');
  const [sortedCarparks, setSortedCarparks] = useState(carparks);
  useEffect(() => {
    const sortedData = sortCarparks(carparks, sortOption);
    setSortedCarparks(sortedData);
  }, [carparks, sortOption]);

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
          <View style={styles.listItem}>
            <ProgressBar progress={item.progress} color="green" style={styles.progress} />
            <View style={styles.textContainer}>
              <Text variant="labelLarge">{item.Address}</Text>
              <Text variant="bodySmall">{item.distance.toFixed(2)} km</Text>
            </View>
            <IconButton
              icon={favourites[item.CarparkID] ? 'heart' : 'heart-outline'}
              iconColor={favourites[item.CarparkID] ? 'blue' : 'black'}
              size={24}
              onPress={() => toggleFavourites(item.CarparkID)}
            />
          </View>
        )}
      />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  progress: {
    width: 30,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  listStyle: {
    flex: 0.7,
  },
  sortStyle: {
    flex: 0.3,
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }, 
});

