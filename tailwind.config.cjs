/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'close-default': "url('/images/close-w.png')",
        'close-hover': "url('/images/close-b.png')",
        'burger': "url('/images/burger.png')",
        'burger-brown': "url('/images/burger-brown.png')",
        // 'presentations-background': "url('/images/presentationsBackground.svg')"
      }

    },
  },
  plugins: [],
}