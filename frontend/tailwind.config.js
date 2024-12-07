// tailwind.config.js
import flowbite from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Make sure to include Flowbite's JS
  ],
  theme: {
    colors: {
      "ash-gray": "#A9B0A2",
      olive: "#5D6351FF",
      "black-olive": "#21261AFF",
      "ash-gray-2": "#B1B7AA",
      "giants-orange": "#FF6629",
      white: "#FEFEFF",
      earth: "#C98728",
    },
    backgroundImage: {
      "hero-pattern": "url('/bg/contour.svg')",
    },
  },
  plugins: [
    flowbite, // Correctly include Flowbite plugin here
  ],
};
