import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

const Temperature = () => {
  // Set default temperature value
  const [temperature, setTemperature] = useState(140);
  const [error, setError] = useState(null);

  const fetchTemperature = async () => {
    try {
      const response = await fetch("https://agrixcubesat.azurewebsites.net/backendapi/telemetry/");
      if (!response.ok) {
        throw new Error("Failed to fetch temperature data");
      }
      const data = await response.json();
      setTemperature(parseFloat(data.sat_temp));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTemperature();
    const intervalId = setInterval(fetchTemperature, 500000000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Error: {error}</div>; // If error occurs, show error message

  const dataSource = {
    chart: {
      caption: "Satellite Temperature",
      subcaption: "(Per Quarter Minute)",
      lowerlimit: "120",
      upperlimit: "200",
      numbersuffix: "°C",
      thmfillcolor: "#008ee4",
      showgaugeborder: "1",
      gaugebordercolor: "#008ee4",
      gaugeborderthickness: "2",
      plottooltext: "Temperature: <b>$datavalue</b>",
      theme: "gammel",
      showvalue: "1",
    },
    value: temperature.toString(),
  };

  return (
    <ReactFusioncharts
      type="thermometer"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default Temperature;
