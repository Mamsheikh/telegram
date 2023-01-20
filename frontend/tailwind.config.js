/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'telegram-blue': '#0088CC',
        'telegram-light-blue': '#D1E8FF',
        'telegram-dark-blue': '#006699',
        'telegram-green': '#00B150',
        'telegram-red': '#FF0000',
      },
    },
  },
  plugins: [require('daisyui')],
};
