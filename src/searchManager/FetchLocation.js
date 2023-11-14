import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        let locationSubscription;

        const fetchLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Location permission not granted');
                    return;
                }

                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.Balanced,
                        // distanceInterval: 100,
                        timeInterval: 30000,
                    },
                    (location) => {
                        const { longitude, latitude } = location.coords;
                        setLocation({ longitude, latitude });
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchLocation();
        console.log("get location");

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, []);

    return location;
};

export default useLocation;
