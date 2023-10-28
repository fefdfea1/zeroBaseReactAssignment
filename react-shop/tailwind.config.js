/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundPosition: {
      "top-left": "0% 10%",
    },
    extend: {
      screens: {
        mobile: "360px",
      },
    },
  },
  plugins: [],
};
