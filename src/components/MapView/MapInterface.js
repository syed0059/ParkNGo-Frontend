import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import { getFavourites, getCarparksByIdArray } from '../../carparkInterface/carparkInterface';
import { useEffect, useState, useContext, useCallback } from 'react';
import * as Location from 'expo-location';
import { RadiusContext } from '../../searchManager/RadiusContext'
import { MapCoordinates } from '../../mapViewManager/MapCoordinatesContext';
import { MapSearchCoordinates } from '../../mapViewManager/MapSearchContext';
import { MapCenterToPin } from '../../mapViewManager/MapCenterToPinContext';
import FavouritesContext from "../../favouritesManager/FavouritesContext";
import { calculateDistance } from '../../searchManager/CalculateDistance';
import ActiveFavouritesContext from "../../favouritesManager/ActiveFavouritesContext";
import { getCarparks } from '../../mapViewManager/MapManager';
import _ from 'lodash'; 

export default function Map({ location, loading, carparks }){

  const { isFavouritesActive } = useContext(ActiveFavouritesContext);
  const { favourites } = useContext(FavouritesContext);
  const [locationsOfInterest, setLocationsOfInterest] = useState([]);
  const { radius } = useContext(RadiusContext);
  const { mapCoordinates, setMapCoordinates } = useContext(MapCoordinates);
  const { mapSearchCoordinates } = useContext(MapSearchCoordinates);
  const { mapCenterToPin, setMapCenterToPin} = useContext(MapCenterToPin);

  // To update list of carparks to be showns
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
  };

  // Drawing out the pins
  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      let color;
      if (item.capacity < 0.1) {
        color = "red";
      } else if (item.capacity < 0.3) {
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
          onPress={e => setMapCenterToPin(e.nativeEvent.coordinate)}
        >
        </Marker>
      );
    });
  };

  const centerToPin = async (coords) => { 
    this.map.animateCamera({center:coords}, {duration:500})
  };

  useEffect(() => {
    centerToPin(mapCenterToPin)
  }, [mapCenterToPin])

  // Update pins when carpark list is updated
  useEffect(() => {
    addIn();
  }, [carparks])

  // Updates map view when user searches in the search bar
  useEffect(() => {
    if(mapSearchCoordinates.latitude!=undefined && mapSearchCoordinates.longitude!=undefined){
      setMapCoordinates({
        latitude: mapSearchCoordinates.latitude,
        longitude:mapSearchCoordinates.longitude,
        latitudeDelta: 0.008540807106718562,
        longitudeDelta: 0.008127428591251373,
      })
    }
  }, [mapSearchCoordinates])

  // Update map to show pins depending if user is in favourite menu or in other menu
  useEffect(() => {
    if(!isFavouritesActive){
      fetchLocation();
    }else{
      addIn();
    }
  }, [isFavouritesActive]);

  // Updates pin when favourites are added/removed
  useEffect(() => {
    if(isFavouritesActive){
      addIn();
    }
  }, [favourites]);

  // Get user location
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

      setMapCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.008540807106718562,
        longitudeDelta: 0.008127428591251373,
      })
    } catch (error) {
      console.error(error);
    }
  };

  // Update location when user allows GPS
  useEffect(() => {
    fetchLocation();
  }, []);

  // Update map coordinates when not in favourite menu
  const debouncedOnRegionChange = useCallback(_.debounce((region) => {
    if(calculateDistance(mapCoordinates.latitude, mapCoordinates.longitude, region.latitude, region.longitude) >= 1 && !isFavouritesActive){
      setMapCoordinates({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
    }
  }, 700));

  // Function is called when map is moved
  const onRegionChange = (region, gesture) => {
    if (gesture.isGesture) {
      debouncedOnRegionChange(region);
    }
  }

  // Shows circle of search when not in favourite menu
  const showCircle = () => {
    if(!isFavouritesActive){
      return <Circle
      center = {{
        latitude: mapCoordinates.latitude,
        longitude: mapCoordinates.longitude,
      }} 
      radius= {radius * 1000}
      strokeColor='blue'
      strokeWidth={2}/>
    }
  };

  return (
    <View style={styles.container}>
      <MapView
      ref={ref=>{
        this.map=ref;
      }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapCoordinates}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={onRegionChange}
        minZoomLevel={13}
        moveOnMarkerPress={false}
      >
        {showLocationsOfInterest()}
        {showCircle()}

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