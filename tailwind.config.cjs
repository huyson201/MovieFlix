/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', " sans-serif"]
      },
      colors: {
        "dark-teal": "#00acc1",
        "light-gray": "#bbbbbb",
        "black-2": '#111'
      },
      screens: {
        "xs": "460px"
      },
      aspectRatio: {
        "2/3": "2/3"
      }
    },
  },
  plugins: [],
}