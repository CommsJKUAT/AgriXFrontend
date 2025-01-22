import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const PressureGauge = () => {
  const [pressure, setPressure] = useState(0); // Default value will be 0
  const [error, setError] = useState(null);

  const fetchPressure = async () => {
    try {
      const response = await fetch("https://agroxsat.onrender.com/backendapi/telemetry/");
      if (!response.ok) {
        throw new Error("Failed to fetch pressure data");
      }
      const data = await response.json();
      setPressure(parseFloat(data.pressure)); // Update pressure value once fetched
    } catch (err) {
      setError(err.message); // Capture error if fetch fails
    }
  };

  useEffect(() => {
    fetchPressure(); // Fetch data when component mounts
    const intervalId = setInterval(fetchPressure, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const chartConfigs = {
    type: "angulargauge",
    width: "100%",
    height: "300",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Pressure Gauge",
        lowerlimit: "0",
        upperlimit: "200",
        numbersuffix: " PSI",
        theme: "fusion",
        showvalue: "1",
        valuefontsize: "20",
        gaugefillmix: "{light+0}",
        gaugeouterradius: "150",
      },
      colorRange: {
        color: [
          {
            minValue: "0",
            maxValue: "70",
            code: "#62B58F",
          },
          {
            minValue: "70",
            maxValue: "140",
            code: "#F8C53A",
          },
          {
            minValue: "140",
            maxValue: "200",
            code: "#E44A00",
          },
        ],
      },
      dials: {
        dial: [
          {
            value: pressure, // Show the pressure (default will be 0, updated once data is fetched)
            rearExtension: "5",
          },
        ],
      },
    },
  };

  if (error) return <div>Error: {error}</div>; // If error, show error message

  return <ReactFC {...chartConfigs} />; // Render chart with updated value
};

export default PressureGauge;
