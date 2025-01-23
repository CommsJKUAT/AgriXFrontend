import DashboardNav from "../../../@Dashboard/nav";
import BatteryGauge from "./components/battery";
import CurrentGauge from "./components/current";
import EPSTemperatureGauge from "./components/eps";
import IMUGauge from "./components/imugauge";
import PressureGauge from "./components/pressure";
import Temperature from "./components/temp";
import VoltageGauge from "./components/voltage";

const Telemetry = () => {
  // Example pressure value; you can replace this with live data
  const pressureValue = 120;
  // Example IMU values; replace these with real data
  const yawValue = 45;
  const pitchValue = -30;
  const rollValue = 10;

  // Example temperature value; replace this with real-time data
  const epsTemperature = 75;

  // Example values; replace with actual data
  const voltageValue = 220;
  const currentValue = 45;

  return (
    <>
      <DashboardNav />
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-3 gap-10">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Temperature />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Temperature
              </h5>
            </div>
          </div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <BatteryGauge />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Battery Level
              </h5>
            </div>
          </div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <PressureGauge pressure={pressureValue} />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Pressure Gauge
              </h5>
            </div>
          </div>
          <div className="col-span-3 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-row justify-center">
              <IMUGauge imuValue={yawValue} type="Yaw" />
              <IMUGauge imuValue={pitchValue} type="Pitch" />
              <IMUGauge imuValue={rollValue} type="Roll" />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                IMU Telemetry
              </h5>
            </div>
          </div>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <EPSTemperatureGauge temperature={epsTemperature} />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                EPS Temperature
              </h5>
            </div>
          </div>
          <div className="col-span-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-row justify-center">
              <VoltageGauge voltage={voltageValue} />
              <CurrentGauge current={currentValue} />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Electrical Telemetry
              </h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Telemetry;