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
  shadowUrl: "",
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
      <div id="map" style={{ flex: 1, width: "100%" }} />
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          fontSize: "14px",
          borderTop: "1px solid #ddd",
        }}
      >
        Data sourced from{" "}
        <a
          href="https://data.gov.sg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          data.gov.sg
        </a>
      </div>
    </div>
  );
};

export default VisualisationMap;
