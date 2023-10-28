import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Map from './src/components/MapView/MapView';
import NavBar from './src/components/SearchView/NavBar';
import useLocation from './src/components/FetchLocation';
import useCarparksDistance from './src/components/FetchCarparkByDistance';
import { RadiusContext } from './src/components/RadiusContext'

export default function App() {

  const [radius, setRadius] = useState(2);
  const location = useLocation();
  const { loading, data: carparks } = useCarparksDistance(location, radius);

  return (
    <PaperProvider>
      <RadiusContext.Provider value={{ radius, setRadius }}>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <Map location={location} loading={loading} carparks={carparks}/>
          </View>
          <View style={styles.searchContainer}>
            <NavigationContainer>
              <NavBar location={location} loading={loading} carparks={carparks} />
            </NavigationContainer>
          </View>
        </View>
      </RadiusContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.5,
  },
  searchContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
});
