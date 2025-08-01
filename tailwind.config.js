/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
// tailwind.config.js
console.log("Tailwind config loaded!");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#03a9f4",
        dark: "#0e0b1d",
        softgray: "#f7f7f7",
      },
    },
  },
  plugins: {
    tailwindcss: { config: "./tailwindcss-config.js" },
  },
};
