import {  useState, useEffect } from "react";
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

  useEffect(() => {
    // Initialize Flowbite
    initFlowbite();

    const fetchCoordinates = async () => {
      try {
        const response = await fetch("https://agroxsat.onrender.com/backendapi/");
        if (!response.ok) throw new Error("Failed to fetch coordinates");
        const data = await response.json();
        console.log("Fetched coordinates:", data); // Log the fetched coordinates
        return data; // Return the data directly
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
      }
    };

    const fetchPlaceAndCountry = async (lat, lon) => {
      try {
        const requestBody = JSON.stringify({ latitude: lat, longitude: lon });
        console.log("Request body:", requestBody);
        const response = await fetch('https://agroxsat.onrender.com/backendapi/baseStation/', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: requestBody
        });
        if (!response.ok) throw new Error("Failed to fetch place and country");
        const data = await response.json();
        console.log(data);
        const { place = "Unknown Place", country = "Unknown Country" } = data.location || {}; 

        setLocationData({
        place,
        country,
    });
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
    };

    getLocationData();
    const intervalId = setInterval(getLocationData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <DashboardNav />
      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-80 h-screen pt-16 transition-transform -translate-x-full bg-black-olive sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full pb-4 overflow-y-auto bg-black-olive -mt-2">
          <ul class=" font-medium ">
            <li className="bg-olive/20">
              <a
                href="#"
                class="flex items-center text-white p-2 rounded-lg group"
              >
                <svg
                  class="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="flex flex-col">
                  <span class="ms-3 font-medium">{locationData.place}</span>
                  <span class="ms-3 text-sm text-olive">{locationData.country}</span>
                </div>
              </a>
            </li>
            <li className="bg-transparent">
              <a
                href="#"
                class="flex items-center text-white p-2 rounded-lg group"
              >
                <svg
                  class="w-6 h-6 text-giants-orange"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="flex flex-col border-b w-full border-b-olive/50 py-2">
                  <span class="ms-3 font-medium">Temperatures</span>
                  <span class="ms-3 text-sm text-olive">20°F</span>
                </div>
              </a>
            </li>
            <li className="bg-transparent">
              <a
                href="#"
                class="flex items-center text-blue-500 p-2 rounded-lg group"
              >
                <svg
                  class="w-5 h-5 text-blue-500 transition duration-75   "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <div className="flex flex-col border-b w-full border-b-olive/50 py-2">
                  <span class="ms-3 font-medium">Soil Moisture</span>
                  <span class="ms-3 text-sm text-olive">20°F</span>
                </div>
              </a>
            </li>
            <li className="bg-transparent">
              <a
                href="#"
                class="flex items-center text-yellow-300 p-2 rounded-lg group"
              >
                <svg
                  class="w-6 h-6 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 17a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.815 9H16.5a2 2 0 1 0-1.03-3.707A1.87 1.87 0 0 0 15.5 5 1.992 1.992 0 0 0 12 3.69 1.992 1.992 0 0 0 8.5 5c.002.098.012.196.03.293A2 2 0 1 0 7.5 9h3.388m2.927-.985v3.604M10.228 9v2.574M15 16h.01M9 16h.01m11.962-4.426a1.805 1.805 0 0 1-1.74 1.326 1.893 1.893 0 0 1-1.811-1.326 1.9 1.9 0 0 1-3.621 0 1.8 1.8 0 0 1-1.749 1.326 1.98 1.98 0 0 1-1.87-1.326A1.763 1.763 0 0 1 8.46 12.9a2.035 2.035 0 0 1-1.905-1.326A1.9 1.9 0 0 1 4.74 12.9 1.805 1.805 0 0 1 3 11.574V12a9 9 0 0 0 18 0l-.028-.426Z"
                  />
                </svg>

                <div className="flex flex-col border-b w-full border-b-olive/50 py-2">
                  <span class="ms-3 font-medium">Precipitation</span>
                  <span class="ms-3 text-sm text-olive">48%</span>
                </div>
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <SoilMoistureTemperatureChart />
          </div>
        </div>
      </aside>

      <div class="sm:ml-80 h-screen pt-14 relative">
        <MapboxComponent />
        <Modal />
      </div>
    </>
  );
};
export default Dashboard;
