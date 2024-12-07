// SmokeSensor.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

const SmokeSensor = () => {
  const data = {
    labels: ["Safe Level", "Warning Level", "Danger Level"],
    datasets: [
      {
        label: "Smoke Level Status",
        data: [70, 20, 10],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div>
      <h3>Smoke Level</h3>
      <div
        className="chart-container"
        style={{ width: "100%", height: "400px" }}
      >
        <Doughnut id="smoke" data={data} options={options} />
      </div>
    </div>
  );
};

export default SmokeSensor;
