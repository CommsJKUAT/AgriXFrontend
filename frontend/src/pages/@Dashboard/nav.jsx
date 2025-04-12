import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { useEffect, useState } from "react";

const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    const storedEmail = localStorage.getItem('email') || '';
    

    setUsername(storedUsername);
    setEmail(storedEmail);
    initFlowbite();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  localStorage.removeItem('email');

  
  window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black-olive border-gray-200 dark:bg-gray-900">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto py-3 px-10">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/satlogo1.jpeg"
            alt="AgroXSAT Logo"
            className="rounded-lg h-7"
          />
          <span className="self-center text-lg font-semibold whitespace-nowrap text-white">
            AgriX Cubesat
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/person.jpg"
              alt="user photo"
            />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-black-olive divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-white">{username}</span>
              <span className="block text-sm text-gray-400">
                {email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              
              <li>
                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-white">
                  Sign out
                </button>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <div className="group">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black-olive md:space-x-1 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {/* Dashboard Link */}
              <li
                className={`group-hover:opacity-50 hover:!opacity-100 hover:bg-olive/25 hover:rounded-full transition-all duration-300 px-4 py-1 ${
                  location.pathname === "/dashboard"
                    ? "bg-olive/50 rounded-full"
                    : "opacity-50"
                }`}
              >
                <NavLink
                  to="/dashboard"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 transition-opacity duration-300"
                >
                  Dashboard
                </NavLink>
              </li>

              {/* Gallery Link */}
              <li
                className={`group-hover:opacity-50 hover:!opacity-100 hover:bg-olive/25 hover:rounded-full transition-all duration-300 px-4 py-1 ${
                  location.pathname === "/gallery"
                    ? "bg-olive/50 rounded-full"
                    : "opacity-50"
                }`}
              >
                <NavLink
                  to="/gallery"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 transition-opacity duration-300"
                >
                  Gallery
                </NavLink>
              </li>

              {/* Sensors Link */}
              <li
                className={`group-hover:opacity-50 hover:!opacity-100 hover:bg-olive/25 hover:rounded-full transition-all duration-300 px-4 py-1 ${
                  location.pathname === "/sensors"
                    ? "bg-olive/50 rounded-full"
                    : "opacity-50"
                }`}
              >
                <NavLink
                  to="/sensors"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 transition-opacity duration-300"
                >
                  Sensors
                </NavLink>
              </li>

              {/* Telemetry Link */}
              <li
                className={`group-hover:opacity-50 hover:!opacity-100 hover:bg-olive/25 hover:rounded-full transition-all duration-300 px-4 py-1 ${
                  location.pathname === "/telemetry"
                    ? "bg-olive/50 rounded-full"
                    : "opacity-50"
                }`}
              >
                <NavLink
                  to="/telemetry"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 transition-opacity duration-300"
                >
                  Telemetry
                </NavLink>
              </li>

              {/* Commands Link */}
              <li
                className={`group-hover:opacity-50 hover:!opacity-100 hover:bg-olive/25 hover:rounded-full transition-all duration-300 px-4 py-1 ${
                  location.pathname === "/commands"
                    ? "bg-olive/50 rounded-full"
                    : "opacity-50"
                }`}
              >
                <NavLink
                  to="/commands"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 transition-opacity duration-300"
                >
                  Commands
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
