import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import Map from "./src/components/MapView/MapView";
import NavBar from "./src/components/SearchView/NavBar";
import useLocation from "./src/components/FetchLocation";
import useCarparksDistance from "./src/components/FetchCarparkByDistance";
import { RadiusContext } from "./src/components/RadiusContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [radius, setRadius] = useState(2);
  const location = useLocation();
  const { loading, data: carparks } = useCarparksDistance(location, radius);

  return (
    <GestureHandlerRootView style={styles.rootview}>
      <PaperProvider>
        <BottomSheetModalProvider>
          <RadiusContext.Provider value={{ radius, setRadius }}>
            <View style={styles.container}>
              <View style={styles.mapContainer}>
                <Map
                  location={location}
                  loading={loading}
                  carparks={carparks}
                />
              </View>
              <View style={styles.searchContainer}>
                <NavigationContainer>
                  <NavBar
                    location={location}
                    loading={loading}
                    carparks={carparks}
                  />
                </NavigationContainer>
              </View>
            </View>
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
  rootview: {
    flex: 1,
  },
});
