/** @type {import('tailwindcss').Config} */

//const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  mode: 'jit',
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui')
  ],
  daisyui:{
    themes: ['dark'],
  },
  theme: {
    extend: {
      animation: {
        "text-focus-in": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
      },
      keyframes: {
          "text-focus-in": {
              "0%": {
                  filter: "blur(12px)",
                  opacity: "0",
              },
              to: {
                  filter: "blur(9px) brightness(130%) contrast(300%) saturate(70%) sepia(10%)",
                  opacity: "0.8",
              }
          }
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Arial', 'Yu Gothic', 'Meiryo', 'sans-serif'],
        serif: ['serif'],
        primary: ['Dosis', 'sans-serif'],
        secondary: ['Courier Prime', 'sans-serif'],
        tertiary: ['Sometype Mono', 'monospace'],
        handwriting: ['Playpen Sans', 'sans-serif'],
      },
      colors:{

      },
      screens: {
        xs: '500px',
        sm: '501px',
        md: '750px',
        lg: '1200px',
        xl: '1400px',
        '2xl': '1800px',
      },
      textShadow: {
        'stroke-1': '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black',
        'stroke-2': '-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black',
        'stroke-3': '-3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 3px 3px 0 black',
        'stroke-4': '-4px -4px 0 black, 4px -4px 0 black, -4px 4px 0 black, 4px 4px 0 black',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
        '103': '1.03',
        '104': '1.04',
        '200': '2',
        '250': '2.5',
        '300': '3',
      }
    },
  },
};
