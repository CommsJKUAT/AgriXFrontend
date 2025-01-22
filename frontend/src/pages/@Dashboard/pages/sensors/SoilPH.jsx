import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const SoilPH = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Soil pH Levels",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
        const soilPHValues = recentData.map((item) => item.soil_ph);

        setChartData({
          labels,
          datasets: [
            {
              label: "Soil pH Levels",
              data: soilPHValues,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
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
      r: {
        beginAtZero: true,
        pointLabels: {
          display: true,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div>
      <h3>Soil pH Level</h3>
      <div className="chart-container" style={{ width: "100%", height: "400px" }}>
        <Radar id="ph" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SoilPH;
