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
