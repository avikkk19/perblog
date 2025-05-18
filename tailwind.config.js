/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "rgb(15 23 42)",
      },
      spacing: {
        54: "13.5rem",
      },
    },
  },
  plugins: [],
};
