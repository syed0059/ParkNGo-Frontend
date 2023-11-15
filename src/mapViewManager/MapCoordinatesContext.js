import React from 'react';

export const MapCoordinates = React.createContext({
    setMapCoordinates: (lat, long, latdelta, longdelta) => {
        return {
            latitude: lat,
            latitudeDelta: latdelta,
            longitude: long,
            longitudeDelta: longdelta,
        };
    },
});
