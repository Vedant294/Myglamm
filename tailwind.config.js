/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          roboto: ["Roboto", "sans-serif"], // add Roboto font here
        },
      },
    },
    plugins: [],
  }
  