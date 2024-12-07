import CropHealthPieChart from "./charts/cropHealth";
import YieldPredictionScatterPlot from "./charts/YieldPrediction";

const Modal = () => {
  return (
    <div
      id="dropdown-cta"
      class="absolute top-14 right-10 2xl:w-80 p-4 mt-6 rounded-lg bg-black-olive"
      role="alert"
    >
      <div className="flex items-center mb-3 flex-col">
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 inline-flex justify-center items-center w-6 h-6 text-olive rounded-lg focus:ring-2 p-1"
          data-dismiss-target="#dropdown-cta"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            class="w-2.5 h-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <div className="max-w-xs rounded-lg shadow-lg p-6 bg-white m-4 hidden 2xl:block">
        <h3 class="text-xl font-semibold text-green-600 mb-4">Crop Status</h3>
        <div class="mb-4 space-y-2">
          <div class="flex items-center">
            <i class="fas fa-seedling text-green-500 mr-2"></i>
            <p class="text-sm">
              <span class="font-bold">Crop Type:</span> Corn
            </p>
          </div>
          <div class="flex items-center">
            <i class="fas fa-leaf text-yellow-500 mr-2"></i>
            <p class="text-sm">
              <span class="font-bold">Growth Stage:</span> Vegetative
            </p>
          </div>
          <div class="flex items-center">
            <i class="fas fa-heartbeat text-red-500 mr-2"></i>
            <p class="text-sm">
              <span class="font-bold">Health:</span> Healthy
            </p>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-sm font-bold">Growth Progress</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-500 h-2.5 rounded-full w-9/12"></div>
          </div>
        </div>
        <div class="py-2 px-4 text-white font-semibold text-center rounded-md bg-green-500">
          Healthy
        </div>
      </div>
      <div className="space-y-4">
        <CropHealthPieChart />
        <YieldPredictionScatterPlot />
      </div>
    </div>
  );
};

export default Modal;
