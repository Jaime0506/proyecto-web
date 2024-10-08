const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|image|input|link|modal|navbar|table|ripple|spinner|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      borderColor: {
        primary: "#FF0004",
        secondary: "#c42e2e"
      },

      backgroundColor: {
        primary: "#FF0004",
        secondary: "#c42e2e"
      },
      fontFamily: {
        roboto: "Roboto",
        open: "Open Sans"
      },
      textColor: {
        primary: "#FF0004",
        secondary: "#c42e2e"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}