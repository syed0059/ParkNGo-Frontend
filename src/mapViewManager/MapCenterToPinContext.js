import React from 'react';

export const MapCenterToPin = React.createContext({
    setMapCoordinates: (lat, long) => {
        return {
            latitude: lat,
            longitude: long,
        };
    },
});
