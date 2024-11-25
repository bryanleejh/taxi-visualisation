import React from "react";
import VisualisationMap from "./components/VisualisationMap";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>
        Singapore Taxi Map
      </h1>
      <VisualisationMap />
    </div>
  );
};

export default App;
