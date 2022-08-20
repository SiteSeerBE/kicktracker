const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  mode: 'jit',
  plugins: [],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {}
  }
})
