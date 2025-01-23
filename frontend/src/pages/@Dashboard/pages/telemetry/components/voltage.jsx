import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const VoltageGauge = () => {
  const [voltage, setVoltage] = useState(0);
  const [error, setError] = useState(null);

  const fetchVoltageLevel = async () => {
    try {
      const response = await fetch(
        "https://agroxsat.onrender.com/backendapi/telemetry/"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data.voltage);
      setVoltage(parseFloat(data.voltage)); 
    } catch (error) {
      console.error('Error fetching voltage data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchVoltageLevel();
    const intervalId = setInterval(fetchVoltageLevel, 5000); 
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const chartConfigs = {
    type: "hlineargauge",
    width: "400",
    height: "150",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Voltage Level",
        lowerlimit: "0",
        upperlimit: "12", 
        numbersuffix: " V",
        theme: "fusion",
        valuefontsize: "20",
        pointerbgalpha: "10",
        showvalue: "0",
        chartBottomMargin: "10",
      },
      colorRange: {
        color: [
          { minValue: "0", maxValue: "5", code: "#e44a00" },
          { minValue: "5", maxValue: "9", code: "#f8bd19" },
          { minValue: "9", maxValue: "12", code: "#6baa01" },
        ],
      },
      pointers: {
        pointer: [
          {
            value: voltage,
            bgColor: "#FF5733", 
            borderColor: "#C70039",
            borderThickness: "4",
            radius: "12",
            alpha: "80",
          },
        ],
      },
    },
  };

  if (error) return <div>Error: {error}</div>; 

  return <ReactFC {...chartConfigs} />;
};

export default VoltageGauge;