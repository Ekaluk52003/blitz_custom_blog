// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
      },
      colors: {
        primary: "#6700eb",
        darkbg: "#0e001d",
      },
    },
  },
  plugins: [],
}
