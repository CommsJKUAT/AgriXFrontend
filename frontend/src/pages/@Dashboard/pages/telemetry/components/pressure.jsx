import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const PressureGauge = () => {
  const [pressure, setPressure] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPressure = async () => {
    try {
      const response = await fetch("https://agrixcubesat.azurewebsites.net/backendapi/telemetry/");
      if (!response.ok) {
        throw new Error("Failed to fetch pressure data");
      }
      const data = await response.json();
      setPressure(parseFloat(data.pressure));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPressure();
    const intervalId = setInterval(fetchPressure, 5000);
    return () => clearInterval(intervalId);
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
            value: pressure,
            rearExtension: "5",
          },
        ],
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ReactFC {...chartConfigs} />;
};

export default PressureGauge;
