import React, { useState, useContext, useEffect } from "react";
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
import ActiveFavouritesContext from "./src/components/ActiveFavouritesContext";
import { MapCoordinates } from "./src/components/MapCoordinatesContext";

export default function AppWrapper() {
    const [radius, setRadius] = useState(2);

    // current location
    const location = useLocation();

    // map location
    const { mapCoordinates } = useContext(MapCoordinates);

    // logic to update the effective location based on the current location or map location
    const [effectiveLocation, setEffectiveLocation] = useState({
        latitude: mapCoordinates.latitude,
        longitude: mapCoordinates.longitude
    });

    // listen for changes to location and mapLocation to update effectiveLocation
    useEffect(() => {
        // when location changes, update effectiveLocation with the new location
        if (location) {
            setEffectiveLocation({
                latitude: location.latitude,
                longitude: location.longitude
            });
            console.log("current location used");
        }
    }, [location]);

    useEffect(() => {
        // when mapLocation changes, update effectiveLocation with the new map location
        if (mapCoordinates) {
            setEffectiveLocation({
                latitude: mapCoordinates.latitude,
                longitude: mapCoordinates.longitude
            });
            console.log("map location used");
        }
    }, [mapCoordinates]);

    const { loading, data: carparks } = useCarparksDistance(effectiveLocation, radius);

    const [searchLocation, setSearchLocation] = useState(null);
    const { searchLoading, data: searchCarparks } = useCarparksDistance(searchLocation, radius);

    const [isFavouritesActive, setFavouritesActive] = useState(false);

    return (
        <GestureHandlerRootView style={styles.rootview}>
            <PaperProvider>
                <BottomSheetModalProvider>
                    <RadiusContext.Provider value={{ radius, setRadius }}>
                        <ActiveFavouritesContext.Provider value={{ isFavouritesActive, setFavouritesActive }}>
                            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
