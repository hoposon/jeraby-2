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
        'close-red': "url('/images/close-red.png')",
        'close-hover': "url('/images/close-black.png')",
        'burger': "url('/images/burger.png')",
        'burger-brown': "url('/images/burger-brown.png')",
        // 'presentations-background': "url('/images/presentationsBackground.svg')"
      }

    },
  },
  plugins: [],
}