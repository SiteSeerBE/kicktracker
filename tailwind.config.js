const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.tsx'
  ],
  darkMode: 'class',
  mode: 'jit',
  plugins: [require('@tailwindcss/line-clamp')],
  theme: {
    colors: {
      primary: '#F57C00',
      secondary: '#3D4F5D'
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
