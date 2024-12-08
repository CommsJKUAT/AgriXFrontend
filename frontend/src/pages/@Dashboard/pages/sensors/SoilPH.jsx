import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
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

const SoilPH = () => {
  const [chartData, setChartData] = useState({
    labels: ["Week 1", "Week 2", "Week 3"],
    datasets: [
      {
        label: "Soil pH Levels",
        data: [7, 7, 7],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://agrixcubesat.azurewebsites.net/backendapi/payload/");
        const data = response.data;

        const groupedData = groupDataByWeek(data);
        const { weeks, soilPHData } = processData(groupedData);

        setChartData({
          labels: weeks,
          datasets: [
            {
              label: "Soil pH Levels",
              data: soilPHData,
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
    const soilPHData = [];

    for (let week in groupedData) {
      weeks.push(`Week ${week}`);
      const weekData = groupedData[week];

      const averagePH = weekData.reduce((sum, item) => sum + item.soil_ph, 0) / weekData.length;

      soilPHData.push(averagePH);
    }

    return { weeks, soilPHData };
  };

  const options = {
    responsive: true,
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
