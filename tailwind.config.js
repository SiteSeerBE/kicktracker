module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  mode: 'jit',
  plugins: [],
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {}
  }
}
