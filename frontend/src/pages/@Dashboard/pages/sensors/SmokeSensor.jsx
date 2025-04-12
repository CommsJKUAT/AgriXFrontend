import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SmokeSensor = () => {
  const [smokeLevels, setSmokeLevels] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchSmokeData = async () => {
      try {
        const response = await axios.get("https://agroxsat.onrender.com/backendapi/payload/");
        const data = response.data;
        const recentData = data.slice(-25);
       
        const levels = recentData.map((item) => item.smoke_level);
        const times =recentData.map((item) =>
                  dayjs(item.created_at).format("HH:mm")
                );
        
        setSmokeLevels(levels);
        setTimestamps(times);
      } catch (error) {
        console.error("Error fetching smoke level data:", error);
      }
    };

    fetchSmokeData();
    const intervalId = setInterval(fetchSmokeData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Smoke Level',
        data: smokeLevels,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(75, 192, 192)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Smoke Level Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Smoke Level'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div>
      <h3>Smoke Level Monitoring</h3>
      <div className="chart-container" style={{ width: "100%", height: "400px" }}>
        <Line data={data} options={options} />
      </div>
      <h4>Current Smoke Level: {smokeLevels[smokeLevels.length - 1] || 'N/A'}</h4>
    </div>
  );
};

export default SmokeSensor;
