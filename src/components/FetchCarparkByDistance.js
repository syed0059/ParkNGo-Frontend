import { useState, useEffect } from 'react';
import { calculateDistance  } from './CalculateDistance';
const carparkInterface = require('../carparkInterface/carparkInterface');

const useCarparksDistance = (location, radius) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCarparks = async () => {
            if (location && radius) {
                try {
                    setLoading(true); // Set loading true at the beginning of the data fetching
                    // get carparks nearby
                    const carparks = await carparkInterface.getCarparksByLocation({ Long: location.longitude, Lat: location.latitude }, radius*1000);
                    // Calculate the distance from current location to carpark
                    const carparksWithDistance = Object.values(carparks).map((carpark) => {
                        const distance = calculateDistance(
                            // Current location
                            location.latitude,
                            location.longitude,
                            // Carpark Location
                            carpark.Coordinates.Lat,
                            carpark.Coordinates.Long
                        );
                        // Set random availability
                        const randomProgress = Math.random();
                        return { ...carpark, distance, progress: randomProgress };
                    });
                    // set carparks
                    setData(carparksWithDistance);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCarparks();
    }, [location, radius]); // The useEffect will rerun whenever location changes

    return { loading, data };
};

export default useCarparksDistance;
