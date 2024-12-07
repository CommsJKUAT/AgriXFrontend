// Sensors.js
import DashboardNav from "../../../@Dashboard/nav";
import SmokeSensor from "./SmokeSensor";
import SoilMoisture from "./SoilMoisture";
import SoilPH from "./SoilPH";
import TemperatureHumidity from "./TemperatureHumidity";

const Sensors = () => {
  return (
    <>
      <DashboardNav />
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-20 p-4 pt-32">
        <SoilMoisture />
        <TemperatureHumidity />
        <SmokeSensor />
        <SoilPH />
      </div>
    </>
  );
};

export default Sensors;
