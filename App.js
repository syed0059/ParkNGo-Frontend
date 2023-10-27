import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Divider, Provider as PaperProvider } from 'react-native-paper';
import Modal from 'react-native-modal';
import Map from './src/components/MapView/MapView';
import CarparkInfo from './src/components/CarparkInfo/CarparkInfo';
import NavBar from './src/components/SearchView/NavBar';
import useLocation from './src/components/FetchLocation';
import useCarparksDistance from './src/components/FetchCarparkByDistance';
import { RadiusContext } from './src/components/RadiusContext'

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);

  const onClick = () => {
    setModalVisible(true);
  };

  const [radius, setRadius] = useState(2);
  const location = useLocation();
  const { loading, data: carparks } = useCarparksDistance(location, radius);

  return (
    <PaperProvider>
      <RadiusContext.Provider value={{ radius, setRadius }}>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <Map />
          </View>
          <View style={styles.searchContainer}>
            <Button mode="contained" onPress={onClick} style={flex = 0.1}>
              <Text>Hello World</Text>
            </Button>
            <Divider />
            <NavigationContainer style={flex = 0.9}>
              <NavBar location={location} loading={loading} carparks={carparks} />
            </NavigationContainer>

          </View>

          <Modal
            isVisible={modalVisible}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection={['down']}
            style={styles.modal}
          >
            <CarparkInfo onClose={() => setModalVisible(false)} />
          </Modal>
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
    flex: 0.4,
  },
  searchContainer: {
    flex: 0.6,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
