import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, RadialLinearScale } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const TemperatureHumidity = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
      {
        label: "Humidity (%)",
        data: [],
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://agroxsat.onrender.com/backendapi/payload/");
        const data = response.data;

        const recentData = data.slice(-25); 

        const labels = recentData.map((item) =>
          dayjs(item.created_at).format("HH:mm")
        );
        const temperatureData = recentData.map((item) => item.temperature);
        const humidityData = recentData.map((item) => item.humidity);

        setChartData({
          labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: temperatureData,
              fill: false,
              borderColor: "orange",
              tension: 0.1,
            },
            {
              label: "Humidity (%)",
              data: humidityData,
              fill: false,
              borderColor: "green",
              tension: 0.1,
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
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Temperature and Humidity</h3>
      <div className="chart-container" style={{ width: "100%", height: "400px" }}>
        <Line id="temp" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TemperatureHumidity;
