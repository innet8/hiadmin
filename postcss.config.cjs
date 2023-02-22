const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [tailwindcss({}), autoprefixer({})]
}
