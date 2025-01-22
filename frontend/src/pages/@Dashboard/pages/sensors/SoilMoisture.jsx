import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom"; // Import the zoom plugin

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin // Register the zoom plugin
);

dayjs.extend(weekOfYear);

const SoilMoisture = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: [],
        backgroundColor: "#3ea8f5",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://agroxsat.onrender.com/backendapi/payload/");
        const data = response.data;

        const recentData = data.slice(-25); // Limit to the most recent 25 points

        const labels = recentData.map((item) =>
          dayjs(item.created_at).format("HH:mm") // Format to show only the time
        );
        const soilMoistureValues = recentData.map((item) => item.soil_moisture);

        setChartData({
          labels,
          datasets: [
            {
              label: "Soil Moisture (%)",
              data: soilMoistureValues,
              backgroundColor: "#3ea8f5",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Time", // Updated axis title
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Soil Moisture (%)",
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x", // Allow panning along the x-axis
        },
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
          pinch: {
            enabled: true, // Enable zooming on touch devices
          },
          mode: "x", // Zoom along the x-axis
        },
      },
    },
  };

  return (
    <div>
      <h3>Soil Moisture</h3>
      <div className="chart-container" style={{ width: "100%", height: "400px" }}>
        <Bar id="soil" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SoilMoisture;
