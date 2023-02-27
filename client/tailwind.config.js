/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#F7F7F6",
        black: "#020104",
        gray: "#BEBAB5",
      },
      objectPosition: {
        "center-bottom": "center bottom",
      },
    },
  },
  plugins: [],
};
