import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import { getAllCarparks, getCarparksByLocation } from '../../carparkInterface/carparkInterface';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const oldInterest = []

const Map = () => {
  const [locationsOfInterest, setLocationsOfInterest] = useState([]);
  const [added, setadd] = useState(null)
  
  const addIn = async () => {
    // oldInterest = []

    const carparks = await getAllCarparks();
    const carparkArray = Object.values(carparks);

    for (let i = 0; i < carparkArray.length; i++) {

      if(carparkArray[i].Coordinates.type != null){
        const newCarparkInfo = {
          title: carparkArray[i].Address,
          location: {
            latitude: carparkArray[i].Coordinates.coordinates[1],
            longitude: carparkArray[i].Coordinates.coordinates[0],
          },
          description: "Marker",
          capacity: 78,
        };
        // setLocationsOfInterest([...locationsOfInterest, newCarparkInfo]);
        oldInterest.push(newCarparkInfo)
        // setLocationsOfInterest(locationsOfInterest => [...locationsOfInterest, newCarparkInfo])
        // data.push(newCarparkInfo)
      }else{
        const newCarparkInfo = {
          title: carparkArray[i].Address,
          location: {
            latitude: carparkArray[i].Coordinates.Lat,
            longitude: carparkArray[i].Coordinates.Long,
          },
          description: "Marker",
          capacity: 78,
        };
        // setLocationsOfInterest([...locationsOfInterest, newCarparkInfo]);
        oldInterest.push(newCarparkInfo)
        // data.push(newCarparkInfo)
      }

    }

    console.log("Done")
    setadd(true)

  };

  useEffect(() => {
    // Call showLocationsOfInterest when the added changes
    showLocationsOfInterest();
  }, [added]);

  // Drawing out the pins
  const showLocationsOfInterest = () => {
    console.log("SHOW")
    // console.log(oldInterest);
    return oldInterest.map((item, index) => {
    // return locationsOfInterest.map((item, index) => {
      let color;
      if (item.capacity <= 50) {
        color = "green";
      } else if (item.capacity <= 75) {
        color = "orange";
      } else {
        color = "red";
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

  addIn()

  const onRegionChange = (region) =>{
    console.log(region);
  };

  const [mapRegion, setMapRegion] = useState({
          latitude: 1.3478769602767113,
          latitudeDelta: 0.008540807106718562,
          longitude: 103.68278687819839,
          longitudeDelta: 0.008127428591251373,
  })

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

        setMapRegion({
          latitude: location.coords.latitude,
          latitudeDelta: 0.008540807106718562,
          longitude: location.coords.longitude,
          longitudeDelta: 0.008127428591251373,
        })
        console.log('Got Location');
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // onRegionChange={onRegionChange}
        // initialRegion={{
        //   latitude: 1.3478769602767113,
        //   latitudeDelta: 0.008540807106718562,
        //   longitude: 103.68278687819839,
        //   longitudeDelta: 0.008127428591251373,
        // }}
        region = {mapRegion}
      >
        {showLocationsOfInterest()}
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

export default Map;
