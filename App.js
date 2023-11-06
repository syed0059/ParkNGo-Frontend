import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import Map from "./src/components/MapView/MapView";
import NavBar from "./src/components/SearchView/NavBar";
import useLocation from "./src/components/FetchLocation";
import useCarparksDistance from "./src/components/FetchCarparkByDistance";
import { RadiusContext } from "./src/components/RadiusContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapCoordinates } from "./src/components/MapCoordinatesContext";
import ActiveFavouritesContext from "./src/components/ActiveFavouritesContext";

export default function App() {
  const [radius, setRadius] = useState(2);
  const location = useLocation();
  const { loading, data: carparks } = useCarparksDistance(location, radius);

  const [searchLocation, setSearchLocation] = useState(null);
  const { searchLoading, data: searchCarparks } = useCarparksDistance(searchLocation, radius);

  const [isFavouritesActive, setFavouritesActive] = useState(false);

  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 1.3478769602767113,
    longitude: 103.68278687819839,
    longitudeDelta: 0.008127428591251373,
    latitudeDelta: 0.008540807106718562,
  })

  return (
    <GestureHandlerRootView style={styles.rootview}>
      <PaperProvider>
        <BottomSheetModalProvider>
          <RadiusContext.Provider value={{ radius, setRadius }}>
            <ActiveFavouritesContext.Provider value={{ isFavouritesActive, setFavouritesActive }}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <MapCoordinates.Provider value={{ mapCoordinates, setMapCoordinates }}>
                  <View style={styles.container}>
                    <View style={styles.mapContainer}>
                      <Map
                        location={location}
                        loading={loading}
                        carparks={carparks}
                      />
                      <View style={styles.searchBar}>
                        <GooglePlacesAutocomplete
                          placeholder='Search'
                          enablePoweredByContainer={false}
                          fetchDetails={true}
                          onPress={(data, details = null) => {
                            if (details && details.geometry && details.geometry.location) {
                              const lat = details.geometry.location.lat;
                              const lng = details.geometry.location.lng;
                              const newSearchLocation = { latitude: lat, longitude: lng };
                              setSearchLocation(newSearchLocation);
                              console.log(newSearchLocation);
                            }
                          }}
                          query={{
                            key: process.env.GOOGLE_API_KEY,
                            language: 'en',
                            components: 'country:sg',
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.searchContainer}>
                      <NavigationContainer>
                        <NavBar
                          location={location}
                          loading={loading}
                          carparks={carparks}
                          searchLoading={searchLoading}
                          searchCarparks={searchCarparks}
                        />
                      </NavigationContainer>
                    </View>
                  </View>
                </MapCoordinates.Provider>
              </TouchableWithoutFeedback>
            </ActiveFavouritesContext.Provider>
          </RadiusContext.Provider>
        </BottomSheetModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
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
    justifyContent: "center",
  },
  searchBar: {
    position: "absolute",
    top: 40,
    width: '90%',
    margin: '5%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rootview: {
    flex: 1,
  },
});
