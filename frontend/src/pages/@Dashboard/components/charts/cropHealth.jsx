import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const CropHealthPieChart = () => {
  const data = {
    labels: ["Healthy", "At-Risk", "Needs Attention"],
    datasets: [
      {
        label: "Crop Health",
        data: [70, 20, 10], // Update this with actual data
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"], // Green, Yellow, Red
        hoverBackgroundColor: ["#218838", "#e0a800", "#c82333"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let value = tooltipItem.raw;
            return ` ${tooltipItem.label}: ${value}%`;
          },
        },
      },
      title: {
        display: true,
        text: "Crop Health Distribution",
        font: {
          size: 16,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default CropHealthPieChart;
