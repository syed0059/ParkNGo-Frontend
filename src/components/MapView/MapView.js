import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { getAllCarparks } from '../../carparkInterface/carparkInterface';
import { useEffect, useState } from 'react';

const oldInterest = [
  {
    title: "First",
    location:{
      "latitude": 1.3445294817909517, 
      "latitudeDelta": 0.00855422618570012, 
      "longitude": 103.68161743506789, 
      "longitudeDelta": 0.008127428591251373
    },
    description: "Marker",
    capacity:50
  },
  {
    title: "Second",
    location:{
      "latitude": 1.3388990512167616, 
      "latitudeDelta": 0.0140593175280872, 
      "longitude": 103.68115676566958, 
      "longitudeDelta": 0.0133577361702919
    },
    description: "Marker",
    capacity:52
  },
  {
    title: "test",
    location:{
      "latitude": 1.342861271368623, 
      "longitude": 103.67866197600961
    },
    capacity:78
  }
]


const Map = () => {
  const [locationsOfInterest, setLocationsOfInterest] = useState([]);
  const [added, setadd] = useState(null)
  
  const addIn = async () => {
    const carparks = await getAllCarparks();
    const carparkArray = Object.values(carparks);

    // // Construct newCarparkInfo using the data from carparkArray
    // const newCarparkInfo = {
    //   title: carparkArray[1].Address,
    //   location: {
    //     latitude: carparkArray[1].Coordinates.coordinates[1],
    //     longitude: carparkArray[1].Coordinates.coordinates[0],
    //   },
    //   description: "Marker",
    //   capacity: 78,
    // };

    // // Update the state with the new carpark info
    // setLocationsOfInterest([...locationsOfInterest, newCarparkInfo]);

    for (let i = 0; i < 10; i++) {
      const newCarparkInfo = {
        title: carparkArray[i].Address,
        location: {
          latitude: carparkArray[i]["Coordinates"]["coordinates"][1],
          longitude: carparkArray[i]["Coordinates"]["coordinates"][0],
        },
        description: "Marker",
        capacity: 78,
      };
  
      // Update the state with the new carpark info
      // oldInterest.push(newCarparkInfo);
      console.log(newCarparkInfo)
      oldInterest.push(newCarparkInfo)
    }

    // setLocationsOfInterest([...locationsOfInterest, oldInterest]);
    console.log(oldInterest)
    console.log(locationsOfInterest)
    setadd(true)

  };

  useEffect(() => {
    // Call addIn when the component mounts or when locationsOfInterest changes
    showLocationsOfInterest();
  }, [added]);

  // Drawing out the pins
  const showLocationsOfInterest = () => {
    console.log("SHOW")
    console.log(oldInterest);
    return oldInterest.map((item, index) => {
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.3478769602767113,
          latitudeDelta: 0.008540807106718562,
          longitude: 103.68278687819839,
          longitudeDelta: 0.008127428591251373,
        }}
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
