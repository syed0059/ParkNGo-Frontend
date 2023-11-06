import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import { getFavourites, getCarparksByIdArray } from '../../carparkInterface/carparkInterface';
import { useEffect, useState, useContext } from 'react';
import * as Location from 'expo-location';
import { RadiusContext } from '../RadiusContext'
import { MapCoordinates } from '../MapCoordinatesContext';
import { calculateDistance } from '../CalculateDistance';
import ActiveFavouritesContext from "../ActiveFavouritesContext";
import { getCarparks } from './mapInterface';

export default function Map({ location, loading, carparks }){

  const { isFavouritesActive } = useContext(ActiveFavouritesContext);

  useEffect(() => {
    if (isFavouritesActive) {
      console.log('FavouritesScreen is focused');
    } else {
      console.log('FavouritesScreen is not focused');
    }
  }, [isFavouritesActive]);

  const [locationsOfInterest, setLocationsOfInterest] = useState([]);
  const [toAdd, setadd] = useState(0);
  const [preventLoad, setPreventLoad] = useState(true);

  const { radius } = useContext(RadiusContext);
  const { mapCoordinates, setMapCoordinates } = useContext(MapCoordinates);

  //To update list of carparks to be showns
  const addIn = async () => {
    let data;

    if (isFavouritesActive) {
      const favouriteCarparks = await getFavourites();
      const carparksByFavs = await getCarparksByIdArray(favouriteCarparks);
      data=getCarparks(carparksByFavs);
    } else {
      data=getCarparks(carparks);
    }

    setLocationsOfInterest(data)
    console.log("Done")
    setadd(toAdd => toAdd + 1)

  };

  // Call showLocationsOfInterest when the toAdd is updated
  useEffect(() => {
    // showLocationsOfInterest();
  }, [toAdd]);

  // Drawing out the pins
  const showLocationsOfInterest = () => {
    console.log("SHOW")
    return locationsOfInterest.map((item, index) => {
      let color;
      if (item.capacity < 10) {
        color = "red";
      } else if (item.capacity < 30) {
        color = "yellow";
      } else {
        color = "green";
      }
      return (
        <Marker
          pinColor={color}
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  
  // Call addIn after loading is done
  useEffect(() => {
    addIn();
    // setPreventLoad(false);
  }, [loading])

  useEffect(() => {
    addIn();
  }, [isFavouritesActive]);


  // Sets default location to NTU
  // const [mapRegion, setMapRegion] = useState({
  //         latitude: 1.3478769602767113,
  //         latitudeDelta: 0.008540807106718562,
  //         longitude: 103.68278687819839,
  //         longitudeDelta: 0.008127428591251373,
  // })

  //  setMapCoordinates({
  //     latitude: 1.3478769602767113,
  //     longitude: 103.68278687819839,
  //     latitudeDelta: 0.008540807106718562,
  //     longitudeDelta: 0.008127428591251373,
  // })

  // Update location when user allows GPS
  useEffect(() => {
    const fetchLocation = async () => { 
      try {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          console.error('Location permission not granted');
          return;
        }
        
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        // setMapRegion({
        //   latitude: location.coords.latitude,
        //   latitudeDelta: 0.008540807106718562,
        //   longitude: location.coords.longitude,
        //   longitudeDelta: 0.008127428591251373,
        // })

        setMapCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.008540807106718562,
          longitudeDelta: 0.008127428591251373,
        })
        console.log('Got Location');
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, []);

  // const onRegionChange = (region) => {
  //   if(calculateDistance(mapRegion.latitude, mapRegion.longitude, region.latitude, region.longitude) >= 0.5){
  //     setMapRegion({
  //       latitude: region.latitude,
  //       longitude: region.longitude,
  //     })
  //     addIn();
  //   }
  //   // console.log(region)
  //   // console.log("NEW")
  //   // console.log(mapRegion)
  // }

  const onRegionChange = (region) => {
    if(calculateDistance(mapCoordinates.latitude, mapCoordinates.longitude, region.latitude, region.longitude) >= 1 && preventLoad == false){
      setMapCoordinates({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      })
      addIn();
    }
    setPreventLoad(false);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        // region = {mapRegion}
        // initialRegion={mapCoordinates}
        region={mapCoordinates}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={onRegionChange}
        minZoomLevel={13}
      >
        {showLocationsOfInterest()}
        <Circle
          center = {{
            // latitude: mapRegion.latitude,
            // longitude: mapRegion.longitude,
            latitude: mapCoordinates.latitude,
            longitude: mapCoordinates.longitude,
          }} 
          radius= {radius * 1000}
          strokeColor='blue'
          strokeWidth={2}/>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

