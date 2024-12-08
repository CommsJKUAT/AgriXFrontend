import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const IMUGauge = ({ type, imuValue }) => {
  const chartConfigs = {
    type: "angulargauge",
    width: "400",
    height: "300",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: `${type} Angle`,
        lowerlimit: "-180",
        upperlimit: "180",
        numbersuffix: "°",
        theme: "fusion",
        showvalue: "1",
        valuefontsize: "20",
        gaugefillmix: "{light+0}",
        gaugeouterradius: "150",
        pivotradius: "10",
        pivotfillcolor: "#000000",
        gaugefillratio: "0,0,100,0",
      },
      colorRange: {
        color: [
          { minValue: "-180", maxValue: "-90", code: "#E44A00" },
          { minValue: "-90", maxValue: "90", code: "#62B58F" },
          { minValue: "90", maxValue: "180", code: "#E44A00" },
        ],
      },
      dials: {
        dial: [
          {
            value: imuValue,
            rearExtension: "5",
          },
        ],
      },
    },
  };

  return <ReactFC {...chartConfigs} />;
};

const IMUDisplay = () => {
  // Set default values for roll, yaw, and pitch to show initial gauge state
  const [imuData, setImuData] = useState({
    roll: 0,
    yaw: 0,
    pitch: 0,
  });
  const [error, setError] = useState(null);

  const fetchIMUData = async () => {
    try {
      const response = await fetch("https://agrixcubesat.azurewebsites.net/backendapi/telemetry/");
      if (!response.ok) {
        throw new Error("Failed to fetch IMU data");
      }
      const data = await response.json();

      setImuData({
        roll: parseFloat(data.roll),
        yaw: parseFloat(data.yaw),
        pitch: parseFloat(data.pitch),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchIMUData();
    const intervalId = setInterval(fetchIMUData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Error: {error}</div>; // If error, show error message

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <IMUGauge type="Roll" imuValue={imuData.roll} />
      <IMUGauge type="Yaw" imuValue={imuData.yaw} />
      <IMUGauge type="Pitch" imuValue={imuData.pitch} />
    </div>
  );
};

export default IMUDisplay;
