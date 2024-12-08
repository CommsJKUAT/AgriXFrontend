import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const SmokeSensor = () => {
  const [smokeData, setSmokeData] = useState([0, 100, 0]);
  const [smokeLevel, setSmokeLevel] = useState(0);

  useEffect(() => {
    const fetchSmokeData = async () => {
      try {
        const response = await axios.get("https://agrixcubesat.azurewebsites.net/backendapi/payload/");
        const latestSmokeLevel = response.data[response.data.length - 1].smoke_level;
        setSmokeLevel(latestSmokeLevel);

        let safeLevel = 0, warningLevel = 0, dangerLevel = 0;

        if (latestSmokeLevel < 10) {
          safeLevel = 100;
        } else if (latestSmokeLevel >= 10 && latestSmokeLevel < 20) {
          warningLevel = 100;
        } else {
          dangerLevel = 100;
        }

        setSmokeData([safeLevel, warningLevel, dangerLevel]);
      } catch (error) {
        console.error("Error fetching smoke level data:", error);
      }
    };

    const intervalId = setInterval(fetchSmokeData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const data = {
    labels: ["Safe Level", "Warning Level", "Danger Level"],
    datasets: [
      {
        label: "Smoke Level Status",
        data: smokeData,
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div>
      <h3>Smoke Level</h3>
      <div className="chart-container" style={{ width: "100%", height: "400px" }}>
        <Doughnut id="smoke" data={data} options={options} />
      </div>
      <h4>Current Smoke Level: {smokeLevel}</h4>
    </div>
  );
};

export default SmokeSensor;
