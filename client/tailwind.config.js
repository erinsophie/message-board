/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        darkPurple: "#8760AB",
        lightPurple: "#D1BEE1",
      },
    },
  },
  plugins: [],
};
