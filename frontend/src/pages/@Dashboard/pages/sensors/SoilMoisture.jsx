// SoilMoisture.js
import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const SoilMoisture = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: [20, 30, 25, 40, 35],
        backgroundColor: "#3ea8f5",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Soil Moisture</h3>
      <div
        className="chart-container"
        style={{ width: "100%", height: "400px" }}
      >
        <Bar id="soil" data={data} options={options} />
      </div>
    </div>
  );
};

export default SoilMoisture;
