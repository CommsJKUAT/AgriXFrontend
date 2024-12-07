import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SoilMoistureTemperatureChart = () => {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"], // Example labels
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: [30, 35, 33, 32, 37, 40, 38], // Example soil moisture data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Soil Temperature (°C)",
        data: [18, 20, 19, 21, 23, 22, 24], // Example soil temperature data
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Soil Moisture and Temperature Over Time",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Soil Moisture (%)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false, // prevents grid lines from appearing on the opposite y-axis
        },
        title: {
          display: true,
          text: "Soil Temperature (°C)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SoilMoistureTemperatureChart;
