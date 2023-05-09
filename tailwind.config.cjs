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
        'burger': "url('/images/burger.png')",
        'burger-brown': "url('/images/burger-brown.png')",
        // 'presentations-background': "url('/images/presentationsBackground.svg')"
      }

    },
  },
  plugins: [],
}