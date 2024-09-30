/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        product: ['"Product Sans"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
