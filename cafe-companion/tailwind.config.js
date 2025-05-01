/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A2C2A",    // Coffee Brown
        secondary: "#D4A76A",  // Latte
        accent: "#8C6B4F",     // Mocha
        background: "#FAF7F2", // Cream
        text: "#2D2926",       // Dark Roast
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
