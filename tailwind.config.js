const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.tsx'
  ],
  darkMode: 'class',
  mode: 'jit',
  plugins: [],
  theme: {
    colors: {
      'kt-primary': '#F57C00',
      'kt-dark': '#3D4F5D'
    },
    extend: {
      transitionProperty: {
        width: 'width'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        title: ['"Baloo 2"', 'cursive']
      }
    }
  }
})
