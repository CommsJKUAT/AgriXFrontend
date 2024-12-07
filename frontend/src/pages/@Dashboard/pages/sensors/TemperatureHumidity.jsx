// TemperatureHumidity.js
import React from "react";
import { Line } from "react-chartjs-2";

const TemperatureHumidity = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [15, 18, 20, 22, 25],
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
      {
        label: "Humidity (%)",
        data: [30, 40, 35, 45, 50],
        fill: false,
        borderColor: "green",
        tension: 0.1,
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
      <h3>Temperature and Humidity</h3>
      <div
        className="chart-container"
        style={{ width: "100%", height: "400px" }}
      >
        <Line id="temp" data={data} options={options} />
      </div>
    </div>
  );
};

export default TemperatureHumidity;
