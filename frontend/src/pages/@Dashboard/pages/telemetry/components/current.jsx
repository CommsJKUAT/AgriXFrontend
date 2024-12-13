import React, { useState, useEffect } from "react";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const CurrentGauge = () => {
  const [current, setCurrent] = useState(50);
  const [error, setError] = useState(null);

  const fetchCurrentValue = async () => {
    try {
      const response = await fetch(
        "https://agroxsat.onrender.com/backendapi/telemetry/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCurrent(parseFloat(data.current));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentValue();
    const intervalId = setInterval(fetchCurrentValue, 5000000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const chartConfigs = {
    type: "angulargauge",
    width: "400",
    height: "300",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Current Level",
        lowerlimit: "0",
        upperlimit: "100",
        numbersuffix: " A",
        theme: "fusion",
        showvalue: "1",
        valuefontsize: "20",
        gaugefillmix: "{light+0}",
        gaugeouterradius: "150",
      },
      colorRange: {
        color: [
          { minValue: "0", maxValue: "30", code: "#62B58F" },
          { minValue: "30", maxValue: "70", code: "#F8C53A" },
          { minValue: "70", maxValue: "100", code: "#E44A00" },
        ],
      },
      dials: {
        dial: [
          {
            value: current,
            rearExtension: "5",
          },
        ],
      },
    },
  };

  if (error) return <div>Error: {error}</div>;

  return <ReactFC {...chartConfigs} />;
};

export default CurrentGauge;
