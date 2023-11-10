import React from 'react';

export const MapSearchCoordinates = React.createContext({
    setMapSearchCoordinates: (lat, long, latdelta, longdelta) => {
        return {
            latitude: lat,
            latitudeDelta: latdelta,
            longitude: long,
            longitudeDelta: longdelta,
        };
    },
});
