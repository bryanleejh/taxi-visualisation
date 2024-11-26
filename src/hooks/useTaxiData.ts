import { useState, useEffect } from "react";

interface TaxiData {
  features: {
    geometry: {
      coordinates: [number, number][];
    };
    properties: {
      timestamp: string;
    };
  }[];
  timestamp: string;
}

const useTaxiData = () => {
  const [taxiData, setTaxiData] = useState<[number, number][]>([]);
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const fetchTaxiData = async () => {
      try {
        const response = await fetch(
          "https://api.data.gov.sg/v1/transport/taxi-availability"
        );
        const data: TaxiData = await response.json();

        // Extract coordinates from the GeoJSON response
        const coordinates = data.features[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng] as [number, number] // Swap order to [lat, lng]
        );
        setTaxiData(coordinates);
        setTimestamp(data.features[0].properties.timestamp);
      } catch (error) {
        console.error("Failed to fetch taxi data:", error);
      }
    };

    fetchTaxiData();

    const interval = setInterval(fetchTaxiData, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return { taxiData, timestamp };
};

export default useTaxiData;
