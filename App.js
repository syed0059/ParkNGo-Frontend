import React, { useState } from "react";
import AppWrapper from "./AppWrapper";
import { MapCoordinates } from "./src/components/MapCoordinatesContext";

export default function App() {

  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 1.3478769602767113,
    longitude: 103.68278687819839,
    longitudeDelta: 0.008127428591251373,
    latitudeDelta: 0.008540807106718562,
  })

  return (
    <MapCoordinates.Provider value={{ mapCoordinates, setMapCoordinates }}>
      <AppWrapper />
    </MapCoordinates.Provider>
  );
}
