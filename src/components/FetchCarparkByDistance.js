import { useState, useEffect } from 'react';
import { calculateDistance } from './CalculateDistance';
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
                    const carparks = await carparkInterface.getCarparksByLocation({ Long: location.longitude, Lat: location.latitude }, radius * 1000);
                    // Calculate the distance from current location to carpark
                    const carparksWithDistance = Object.values(carparks).map((carpark) => {
                        const [longitude, latitude] = carpark.Coordinates.coordinates;
                        const distance = calculateDistance(
                            // Current location
                            location.latitude,
                            location.longitude,
                            // Carpark Location
                            latitude,
                            longitude
                        );
                        const cAvail = carpark.availability.car.availability || 0;
                        const mAvail = carpark.availability.motorcycle.availability || 0;
                        const tAvail = cAvail + mAvail;

                        const cTotal = carpark.availability.car.total || 0;
                        const mTotal = carpark.availability.motorcycle.total || 0;
                        const tTotal = cTotal + mTotal;

                        let avail = 0;

                        if (tTotal != 0) {
                            avail = tAvail / tTotal;
                        }

                        const availabilityPercentage = avail;
                        return { ...carpark, distance, progress: availabilityPercentage, tAvail };
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
        // console.log("called db");
    }, [location, radius]); // The useEffect will rerun whenever location changes

    return { loading, data };
};

export default useCarparksDistance;
