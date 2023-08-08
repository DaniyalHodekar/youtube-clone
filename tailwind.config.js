/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      gridTemplateColumns: {
        container: "repeat( auto-fit, minmax(300px, 1fr) )",
      },
    },
  },
  plugins: [],
};

