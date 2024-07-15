import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ["Raleway", "sans-serif"]
      },
      colors: {
        cwCream: '#FFF6E9',
        cwOrange: '#FF7F3E',
        cwLightBlue: '#80C4E9',
        cwViolate: '#604CC3'
      }
    },
  },
  plugins: [daisyui],
}

