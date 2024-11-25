import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const VisualisationMap: React.FC = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([1.3521, 103.8198], 12);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Dummy taxi data: Latitude, Longitude
    const dummyTaxis = [
      [1.3521, 103.8198], // Central Singapore
      [1.35735, 103.894], // East Singapore
      [1.3403, 103.7077], // West Singapore
      [1.4294, 103.7748], // North Singapore
    ];

    // Add markers for dummy taxis
    dummyTaxis.forEach(([lat, lng]) => {
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<b>Taxi Available</b><br>Location: ${lat}, ${lng}`);
    });

    return () => {
      map.remove(); // Clean up the map
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default VisualisationMap;
