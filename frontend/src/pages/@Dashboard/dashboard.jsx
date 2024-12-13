import { useState, useEffect } from "react";
import MapboxComponent from "./components/googlemaps";
import Modal from "./components/modal";
import DashboardNav from "./nav";
import { initFlowbite } from "flowbite";
import SoilMoistureTemperatureChart from "./components/charts/SoilMoistureTemperatureChart";

const Dashboard = () => {
  const [locationData, setLocationData] = useState({
    place: "Loading...",
    country: "Loading...",
  });
  const [soilMoisture, setSoilMoisture] = useState("Loading...");
  const [temperature, setTemperature] = useState("Loading...");
  const [humidity, setHumidity] = useState("Loading...");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    initFlowbite();

    const fetchClimateData = async () => {
      try {
        const response = await fetch("https://agroxsat.onrender.com/backendapi/payload/");
        if (!response.ok) throw new Error("Failed to fetch climate data");
        const data = await response.json();
        const latestData = data[0];
        setSoilMoisture(latestData.soil_moisture);
        setTemperature(latestData.temperature);
        setHumidity(latestData.humidity);
      } catch (error) {
        console.error("Error fetching climate data:", error);
      }
    };

    const fetchCoordinates = async () => {
      try {
        const response = await fetch("https://agroxsat.onrender.com/backendapi/");
        if (!response.ok) throw new Error("Failed to fetch coordinates");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
      }
    };

    const fetchPlaceAndCountry = async (lat, lon) => {
      try {
        const requestBody = JSON.stringify({ latitude: lat, longitude: lon });
        const response = await fetch('https://agroxsat.onrender.com/backendapi/baseStation/', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: requestBody
        });
        if (!response.ok) throw new Error("Failed to fetch place and country");
        const data = await response.json();
        const { place = "Unknown Place", country = "Unknown Country" } = data.location || {}; 
        setLocationData({ place, country });
      } catch (error) {
        console.error("Error fetching place and country:", error);
      }
    };

    const getLocationData = async () => {
      const coords = await fetchCoordinates();
      if (coords) {
        const { latitude, longitude } = coords; 
        await fetchPlaceAndCountry(latitude, longitude); 
      }
      await fetchClimateData();
    };

    getLocationData();
    const intervalId = setInterval(getLocationData, 60000000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <DashboardNav />
      <MapboxComponent /> {/* Map is here */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-80 h-screen pt-16 transition-transform -translate-x-full bg-black-olive sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full pb-4 overflow-y-auto bg-black-olive -mt-2">
          <ul className="font-medium">
            <li className="bg-olive/20">
              <a href="#" className="flex items-center text-white p-2 rounded-lg group">
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col">
                  <span className="ms-3 font-medium">{locationData.place}</span>
                  <span className="ms-3 text-sm text-olive">{locationData.country}</span>
                </div>
              </a>
            </li>
            <li className="bg-transparent">
              <a href="#" className="flex items-center text-white p-2 rounded-lg group">
                <svg className="w-6 h-6 text-giants-orange" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col border-b w-full border-b-olive/50 py-2">
                  <span className="ms-3 font-medium">Temperatures</span>
                  <span className="ms-3 text-sm text-olive">{temperature}°C</span>
                </div>
              </a>
            </li>
            <li className="bg-transparent">
              <a href="#" className="flex items-center text-white p-2 rounded-lg group">
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M6.707 11.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293V6a1 1 0 1 1 2 0v5.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col py-2">
                  <span className="ms-3 font-medium">Soil Moisture</span>
                  <span className="ms-3 text-sm text-olive">{soilMoisture}%</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-white p-2 rounded-lg group">
                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 9a1 1 0 0 1 1 1v9h6a1 1 0 0 1 1 1V3a1 1 0 0 1-1-1h-6v9a1 1 0 0 1-1 1z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col py-2">
                  <span className="ms-3 font-medium">Humidity</span>
                  <span className="ms-3 text-sm text-olive">{humidity}%</span>
                </div>
              </a>
            </li>
            <li className="bg-transparent">
              <SoilMoistureTemperatureChart />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Dashboard;
