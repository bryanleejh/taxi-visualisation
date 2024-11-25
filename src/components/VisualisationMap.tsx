import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useTaxiData from "../hooks/useTaxiData";

const VisualisationMap: React.FC = () => {
  const taxiData = useTaxiData();

  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([1.3521, 103.8198], 12);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Layer group to manage taxi markers
    const taxiLayer = L.layerGroup().addTo(map);

    // Update markers when taxi data changes
    taxiLayer.clearLayers(); // Clear old markers
    taxiData.forEach(([lat, lng]) => {
      L.marker([lat, lng])
        .addTo(taxiLayer)
        .bindPopup(`<b>Taxi Available</b><br>Location: ${lat}, ${lng}`);
    });

    return () => {
      map.remove(); // Clean up on unmount
    };
  }, [taxiData]);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default VisualisationMap;
