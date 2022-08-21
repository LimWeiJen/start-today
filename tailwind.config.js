/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'dark-blue': '#171D2D',
      'white': '#FFFFFF',
      'blue': '#5582F6',
      'gray': '#D9D9D9',
      'black': '#000000',
    },
    extend: {}
  },
  plugins: [],
}
