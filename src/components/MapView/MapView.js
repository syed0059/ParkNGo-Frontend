import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import { getAllCarparks, getCarparksByLocation } from '../../carparkInterface/carparkInterface';
import { useEffect, useState, useContext } from 'react';
import * as Location from 'expo-location';
import { RadiusContext } from '../RadiusContext'

export default function Map({ location, loading, carparks }){
  const [locationsOfInterest, setLocationsOfInterest] = useState([]);
  const [toAdd, setadd] = useState(0)

  const { radius } = useContext(RadiusContext);

  //To update list of carparks to be showns
  const addIn = async () => {
    data = []

    const carparkArray = Object.values(carparks);

    for (let i = 0; i < carparkArray.length; i++) {

      let avail = carparkArray[i].availability.motorcycle.availability + carparkArray[i].availability.car.availability
      let total = carparkArray[i].availability.motorcycle.total + carparkArray[i].availability.car.total
      let percent = (avail/total) * 100
      const newCarparkInfo = {
        title: carparkArray[i].Address,
        location: {
          latitude: carparkArray[i].Coordinates.coordinates[1],
          longitude: carparkArray[i].Coordinates.coordinates[0],
        },
        description: "Carpark",
        capacity: percent,
      };
      data.push(newCarparkInfo)

    }

    setLocationsOfInterest(data)
    console.log("Done")
    setadd(toAdd => toAdd + 1)

  };

  // Call showLocationsOfInterest when the toAdd is updated
  useEffect(() => {
    showLocationsOfInterest();
  }, [toAdd]);

  // Drawing out the pins
  const showLocationsOfInterest = () => {
    console.log("SHOW")
    return locationsOfInterest.map((item, index) => {
      let color;
      if (item.capacity <= 70) {
        color = "green";
      } else if (item.capacity <= 90) {
        color = "yellow";
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

  // Call addIn after loading is done
  useEffect(() => {
    addIn();
  }, [loading])

  // Sets default location to NTU
  const [mapRegion, setMapRegion] = useState({
          latitude: 1.3478769602767113,
          latitudeDelta: 0.008540807106718562,
          longitude: 103.68278687819839,
          longitudeDelta: 0.008127428591251373,
  })

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
        provider={PROVIDER_GOOGLE}
        region = {mapRegion}
        showsUserLocation={true}
      >
        {showLocationsOfInterest()}
        <Circle
          center = {{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude
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

