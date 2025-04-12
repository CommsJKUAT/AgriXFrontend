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
  const [submitMessage, setSubmitMessage] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const closeModal = () => {
    setIsModalOpen(false); 
  };

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
      const response = await fetch("https://agroxsat.onrender.com/backendapi/baseStation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
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

  // Define handleLocationSubmit outside of useEffect
  const handleLocationSubmit = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const requestBody = JSON.stringify({ latitude, longitude });
            const response = await fetch("https://agroxsat.onrender.com/backendapi/setGS/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: requestBody,
            });
            if (response.ok) {
              const data = await response.json();
              setSubmitMessage(data.success || "Ground Station set successfully.");
            } else {
              const errorData = await response.json();
              setSubmitMessage(errorData.error || "Failed to submit coordinates.");
            }
          } catch (error) {
            console.error("Error submitting coordinates:", error);
            setSubmitMessage("An error occurred while submitting coordinates.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setSubmitMessage("Failed to retrieve your location.");
        }
      );
    } else {
      setSubmitMessage("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    initFlowbite();
    getLocationData();
    const intervalId = setInterval(getLocationData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <DashboardNav />
      <MapboxComponent /> 
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
                <div className="flex flex-col border-b w-full border-b-olive/50 py-2">
                  <span className="ms-3 font-medium">Temperatures</span>
                  <span className="ms-3 text-sm text-olive">{temperature}°C</span>
                </div>
              </a>
            </li>
            <li className="bg-transparent">
              <a href="#" className="flex items-center text-white p-2 rounded-lg group">
                <div className="flex flex-col py-2">
                  <span className="ms-3 font-medium">Soil Moisture</span>
                  <span className="ms-3 text-sm text-olive">{soilMoisture}%</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-white p-2 rounded-lg group">
                <div className="flex flex-col py-2">
                  <span className="ms-3 font-medium">Humidity</span>
                  <span className="ms-3 text-sm text-olive">{humidity}%</span>
                </div>
              </a>
            </li>
           
            <li className="bg-transparent">
              <SoilMoistureTemperatureChart />
            </li>
            <li>
              <button
                onClick={handleLocationSubmit}
                className="px-4 py-2 mt-2 ml-8 text-white bg-blue-600 rounded-lg hover:bg-blue-800"
              >
                Set GS
              </button>
              {submitMessage && (
                <p className="mt-2 text-sm ml-8">{submitMessage}</p>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Dashboard;
