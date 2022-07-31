/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'dark-blue': '#171D2D',
      'gray': '#B8B8B8',
      'blue': '#5582F6',
      'black': '#636363',
      'white': '#FFFFFF',
    },
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 1,
          },
        },
        'text-fade-in': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '50%': {
            transform: 'translateY(0px)',
          },
          '100%': {
            opacity: 1,
          }
        }
      },
    }
  },
  plugins: [],
}
