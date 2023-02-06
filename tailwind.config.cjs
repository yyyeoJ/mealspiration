/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes:{
        appearDown:{
          "0%":{opacity:"0%",transform:"translateY(-2rem)"},
          "100%":{opacity:"100%",transform:"translateY(0rem)"}
        },
        appearUp:{
          "0%":{opacity:"0%",transform:"translateY(2rem)"},
          "100%":{opacity:"100%",transform:"translateY(0rem)"}
        },
        dropDown:{
          "0%":{height:"0rem"},
          "100%":{height:"15rem"}
        }
      },
      animation:{
        "appearDown" : "appearDown 1.5s linear",
        "appearUp" : "appearUp 1.5s linear",
        "dropDown" : "dropDown 1.5s linear",
        "dropUp" : "dropDown 1.5s backwards"
      }
    },
  },
  plugins: [],
}
