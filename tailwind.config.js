const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f8f8f8",
          200: "#a8a8b3",
          500: "#835afd",
          900: "#29292e",
        },
      },
      fontFamily: {
        primary: ["Roboto"],
        secondary: ["Poppins"],
      },
    },
  },
  plugins: [],
};
