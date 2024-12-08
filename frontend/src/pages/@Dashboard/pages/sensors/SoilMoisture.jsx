import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

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
        const response = await axios.get("https://agrixcubesat.azurewebsites.net/backendapi/payload/");
        const data = response.data;

        const groupedData = groupDataByWeek(data);
        const { weeks, soilMoistureData } = processData(groupedData);

        setChartData({
          labels: weeks,
          datasets: [
            {
              label: "Soil Moisture (%)",
              data: soilMoistureData,
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
    const soilMoistureData = [];

    for (let week in groupedData) {
      weeks.push(`Week ${week}`);
      const weekData = groupedData[week];

      const averageSoilMoisture = weekData.reduce((sum, item) => sum + item.soil_moisture, 0) / weekData.length;

      soilMoistureData.push(averageSoilMoisture);
    }

    return { weeks, soilMoistureData };
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
      <h3>Soil Moisture</h3>
      <div
        className="chart-container"
        style={{ width: "100%", height: "400px" }}
      >
        <Bar id="soil" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SoilMoisture;
