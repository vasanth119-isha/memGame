/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/bg/ebg.png')",
        'card': "url('/bg/chipbg.png')",
      },
   },
  },
  theme: {
    extend: {
      fontFamily: {
        Cabin: ["Cabin Sketch", "sans-serif"],
      },
    },
  },
  plugins: [],
})
