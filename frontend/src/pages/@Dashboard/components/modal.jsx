import { useState } from "react";
import CropHealthPieChart from "./charts/cropHealth";
import YieldPredictionScatterPlot from "./charts/YieldPrediction";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen ? (
        <div
          id="dropdown-cta"
          className="absolute bottom-10 right-10 2xl:w-80 p-4 mt-6 rounded-lg bg-black-olive"
          role="alert"
        >
          <div className="max-w-xs rounded-lg shadow-lg p-6 bg-white m-4 relative">
            <div className="mb-4 space-y-2">
              <div className="flex items-center">
                <i className="fas fa-seedling text-green-500 mr-2"></i>
                <p className="text-sm">
                  <span className="font-bold">Crop Type:</span> Corn
                </p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-leaf text-yellow-500 mr-2"></i>
                <p className="text-sm">
                  <span className="font-bold">Growth Stage:</span> Vegetative
                </p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-heartbeat text-red-500 mr-2"></i>
                <p className="text-sm">
                  <span className="font-bold">Health:</span> Healthy
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-bold">Growth Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full w-9/12"></div>
              </div>
            </div>
            <div className="py-2 px-4 text-white font-semibold text-center rounded-md bg-green-500">
              Healthy
            </div>
            <div className="space-y-4 mt-4">
              <CropHealthPieChart />
              <YieldPredictionScatterPlot />
            </div>
            {/* Close Button */}
            <button
              type="button"
              className="absolute bottom-4 right-4 w-6 h-6 text-olive rounded-full focus:ring-2 p-1"
              onClick={handleToggle}
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleToggle}
          className="absolute bottom-10 right-10 p-4 bg-green-500 text-white rounded-lg"
        >
          Open Crop Status
        </button>
      )}
    </>
  );
};

export default Modal;
