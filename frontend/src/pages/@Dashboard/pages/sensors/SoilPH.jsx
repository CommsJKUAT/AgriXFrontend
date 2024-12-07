// SoilPH.js
import React from "react";
import { Radar } from "react-chartjs-2";

const SoilPH = () => {
  const data = {
    labels: ["Sample 1", "Sample 2", "Sample 3", "Sample 4", "Sample 5"],
    datasets: [
      {
        label: "Soil pH Levels",
        data: [5.5, 6.0, 6.2, 6.5, 6.3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div>
      <h3>Soil pH Level</h3>
      <div
        className="chart-container"
        style={{ width: "100%", height: "400px" }}
      >
        <Radar id="ph" data={data} options={options} />
      </div>
    </div>
  );
};

export default SoilPH;
