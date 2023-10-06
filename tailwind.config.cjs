/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'close-default': "url('/images/close-default.png')",
        'close-hover': "url('/images/close-black.png')",
        'close-trans-red': "url('/images/close-trans-red.png')",
        'close-trans-white': "url('/images/close-trans-white.png')",
        'home-icon': "url('/images/crane-icon-white.png')",
        'home-icon-red': "url('/images/crane-icon-red.png')",
        'main-crane': "url('/images/crane-icon-white.png')",
      },
      screens: {
        'minRes350': { 'raw': '(min-width: 350px)' },
        'minRes550': { 'raw': '(min-width: 550px)' },
        'lowh': { 'raw': '(max-height: 450px)' },
        // => @media (min-height: 800px) { ... }
      }
    },
  },
  plugins: [],
}