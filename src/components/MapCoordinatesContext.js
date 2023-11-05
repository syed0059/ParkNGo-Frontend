import React from 'react';

export const MapCoordinates = React.createContext({
    // latitude: 1.3478769602767113,
    // latitudeDelta: 0.008540807106718562,
    // longitude: 103.68278687819839,
    // longitudeDelta: 0.008127428591251373,
    setMapCoordinates: (lat, long, latdelta, longdelta) => {
        return {
            latitude: lat,
            latitudeDelta: latdelta,
            longitude: long,
            longitudeDelta: longdelta,
        };
    },
    // Other settings can also be added here
});
