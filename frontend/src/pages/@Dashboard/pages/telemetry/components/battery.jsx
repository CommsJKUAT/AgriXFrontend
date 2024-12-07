import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const BatteryGauge = () => {
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBatteryLevel = async () => {
    try {
      const response = await fetch(
        "https://agrixcubesat.azurewebsites.net/backendapi/telemetry/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setLevel(parseFloat(data.batt));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatteryLevel();
    const intervalId = setInterval(fetchBatteryLevel, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const chartConfigs = {
    type: "hlineargauge",
    width: "100%",
    height: "150",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Battery Level",
        lowerlimit: "0",
        upperlimit: "100",
        numbersuffix: "%",
        theme: "fusion",
        valuefontsize: "20",
        pointerbgalpha: "10",
        showvalue: "0",
      },
      colorRange: {
        color: [
          { minValue: "0", maxValue: "20", code: "#e44a00" },
          { minValue: "20", maxValue: "50", code: "#f8bd19" },
          { minValue: "50", maxValue: "100", code: "#6baa01" },
        ],
      },
      pointers: {
        pointer: [
          {
            value: level,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ReactFC {...chartConfigs} />;
};

export default BatteryGauge;
