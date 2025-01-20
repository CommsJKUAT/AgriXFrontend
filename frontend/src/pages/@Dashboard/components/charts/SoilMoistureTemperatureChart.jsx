import React, { useEffect, useState } from "react";
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
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [soilMoistureData, setSoilMoistureData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://agroxsat.onrender.com/backendapi//");
        const data = await response.json();

        const groupedData = {};

        data.forEach((item) => {
          const date = new Date(item.created_at).toISOString().split('T')[0];

          if (!groupedData[date]) {
            groupedData[date] = {
              soil_moisture: [],
              temperature: [],
              humidity: [],
            };
          }

          groupedData[date].soil_moisture.push(item.soil_moisture);
          groupedData[date].temperature.push(item.temperature);
          groupedData[date].humidity.push(item.humidity);
        });

        const averages = Object.keys(groupedData).map((date) => {
          const { soil_moisture, temperature, humidity } = groupedData[date];
          const avgSoilMoisture =
            soil_moisture.reduce((sum, val) => sum + val, 0) / soil_moisture.length;
          const avgTemperature =
            temperature.reduce((sum, val) => sum + val, 0) / temperature.length;
          const avgHumidity =
            humidity.reduce((sum, val) => sum + val, 0) / humidity.length;

          return {
            date,
            avgSoilMoisture,
            avgTemperature,
            avgHumidity,
          };
        });

        averages.sort((a, b) => new Date(b.date) - new Date(a.date));

        const last7DaysData = averages.slice(0, 7);

        setSoilMoistureData(last7DaysData.map((item) => item.avgSoilMoisture));
        setTemperatureData(last7DaysData.map((item) => item.avgTemperature));
        setHumidityData(last7DaysData.map((item) => item.avgHumidity));

        setLabels(last7DaysData.map((item) => {
          const date = new Date(item.date);
          return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
        }));
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
  }, []);

  if (
    temperatureData.length === 0 ||
    humidityData.length === 0 ||
    soilMoistureData.length === 0
  ) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: soilMoistureData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Soil Temperature (°C)",
        data: temperatureData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Soil Humidity (%)",
        data: humidityData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
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
        text: "Soil Moisture, Temperature, and Humidity Over Time",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: false,
        position: "left",
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SoilMoistureTemperatureChart;
