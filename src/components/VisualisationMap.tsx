import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const VisualisationMap: React.FC = () => {
  useEffect(() => {
    const map = L.map("map").setView([1.3521, 103.8198], 12); // Centered on Singapore

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    return () => {
      map.remove(); // Cleanup when the component unmounts
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default VisualisationMap;
