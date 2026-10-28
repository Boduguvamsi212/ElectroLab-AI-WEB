/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 4s ease-in-out infinite",
        glow: "pulse-glow 2s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}
