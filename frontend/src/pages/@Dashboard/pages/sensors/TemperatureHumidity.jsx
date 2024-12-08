import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale  
);

dayjs.extend(weekOfYear);

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
        const response = await axios.get("https://agrixcubesat.azurewebsites.net/backendapi/payload/");
        const data = response.data;

        const groupedData = groupDataByWeek(data);
        const { weeks, temperatureData, humidityData } = processData(groupedData);

        setChartData({
          labels: weeks,
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

  const groupDataByWeek = (data) => {
    return data.reduce((acc, item) => {
      const weekNumber = dayjs(item.created_at).week();
      if (!acc[weekNumber]) {
        acc[weekNumber] = [];
      }
      acc[weekNumber].push(item);
      return acc;
    }, {});
  };

  const processData = (groupedData) => {
    const weeks = [];
    const temperatureData = [];
    const humidityData = [];

    for (let week in groupedData) {
      weeks.push(`Week ${week}`);
      const weekData = groupedData[week];

      const averageTemp = weekData.reduce((sum, item) => sum + item.temperature, 0) / weekData.length;
      const averageHumidity = weekData.reduce((sum, item) => sum + item.humidity, 0) / weekData.length;

      temperatureData.push(averageTemp);
      humidityData.push(averageHumidity);
    }

    return { weeks, temperatureData, humidityData };
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
        <Line id="temp" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TemperatureHumidity;
