import React from "react";
import { Scatter } from "react-chartjs-2";

const YieldPredictionScatterPlot = () => {
  const data = {
    datasets: [
      {
        label: "Yield Data",
        data: [
          { x: 50, y: 52 },
          { x: 75, y: 70 },
          { x: 100, y: 90 },
          { x: 120, y: 115 },
          { x: 140, y: 130 },
        ], // Example data points
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Predicted vs. Actual Yield",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Predicted Yield (kg/hectare)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Actual Yield (kg/hectare)",
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

export default YieldPredictionScatterPlot;
