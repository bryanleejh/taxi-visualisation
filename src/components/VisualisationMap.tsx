import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useTaxiData from "../hooks/useTaxiData";

interface ExtendedIconPrototype extends L.Icon.Default {
  _getIconUrl?: () => string; // Define the type for the private method
}

// Fix for Leaflet's default icon paths
delete (L.Icon.Default.prototype as ExtendedIconPrototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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
