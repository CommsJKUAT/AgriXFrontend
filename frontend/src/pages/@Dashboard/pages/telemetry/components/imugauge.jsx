import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const IMUGauge = ({ type, imuValue }) => {
  // Ensure value is within -180 to 180 range
  const normalizedValue = ((imuValue % 360 + 540) % 360) - 180;

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
        baseFont: "Arial",
        valueFontColor: "#000000",
        tickValueDistance: "10",
        majorTMNumber: "9", // Show more tick marks
        minorTMNumber: "5", // Show minor tick marks
        showGaugeBorder: "1",
        gaugeInnerRadius: "75%",
        showValue: "1",
        placeValuesInside: "1",
      },
      colorRange: {
        color: [
          { minValue: "-180", maxValue: "-90", code: "#E44A00", alpha: "25" },
          { minValue: "-90", maxValue: "90", code: "#62B58F", alpha: "25" },
          { minValue: "90", maxValue: "180", code: "#E44A00", alpha: "25" },
        ],
      },
      dials: {
        dial: [
          {
            value: normalizedValue,
            baseWidth: "8",
            rearExtension: "15",
            tooltext: `${type}: $value°`,
          },
        ],
      },
      annotations: {
        groups: [
          {
            items: [
              {
                type: "text",
                id: "text1",
                text: `${normalizedValue.toFixed(1)}°`,
                align: "center",
                vAlign: "bottom",
                fontSize: "20",
                bold: "1",
                y: "$gaugeCenterY - 40",
              },
            ],
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
      const response = await fetch("https://agroxsat.onrender.com/backendapi/telemetry/");
      if (!response.ok) {
        throw new Error("Failed to fetch IMU data");
      }
      const data = await response.json();

      // Ensure values are properly normalized
      setImuData({
        roll: Number(data.roll) || 0,
        yaw: Number(data.yaw) || 0,
        pitch: Number(data.pitch) || 0,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchIMUData();
    const intervalId = setInterval(fetchIMUData, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Error: {error}</div>; 

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <IMUGauge type="Roll" imuValue={imuData.roll} />
      <IMUGauge type="Yaw" imuValue={imuData.yaw} />
      <IMUGauge type="Pitch" imuValue={imuData.pitch} />
    </div>
  );
};

export default IMUDisplay;
