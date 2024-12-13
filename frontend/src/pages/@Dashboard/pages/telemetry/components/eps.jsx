import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, Widgets, FusionTheme);

const EPSTemperatureGauge = () => {
  const [temperature, setTemperature] = useState(25);
  const [error, setError] = useState(null);

  const fetchTemperature = async () => {
    try {
      const response = await fetch("https://agroxsat.onrender.com/backendapi/telemetry/");
      if (!response.ok) {
        throw new Error("Failed to fetch EPS temperature data");
      }
      const data = await response.json();
      setTemperature(parseFloat(data.eps_temp));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTemperature();
    const intervalId = setInterval(fetchTemperature, 500000000);
    return () => clearInterval(intervalId);
  }, []);

  const chartConfigs = {
    type: "thermometer",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "EPS Temperature",
        subcaption: "In Celsius",
        lowerlimit: "-50",
        upperlimit: "150",
        numbersuffix: "°C",
        thmfillcolor: "#E44A00",
        showgaugeborder: "1",
        gaugebordercolor: "#E44A00",
        gaugeborderthickness: "2",
        showvalue: "1",
        valuefontsize: "20",
        tickmarkdistance: "5",
        showtickmarks: "1",
        showtickvalues: "1",
        thermometerbulbheight: "15",
        thermometerbulbwidth: "20",
      },
      value: temperature.toString(),
    },
  };

  if (error) return <div>Error: {error}</div>;

  return <ReactFusioncharts {...chartConfigs} />;
};

export default EPSTemperatureGauge;
