/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azulClaro: "#045FF5",
        azulOscuro: "#021859",
        grisClaro: "#F1F2F7",
        grisOscuro: "#D9D9D9",
      },
      fontFamily: {
        Quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
