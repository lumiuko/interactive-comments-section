/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#334253',
        'grayish-blue': '#67727E',
        'very-light-gray': '#F5F6FA',
        'light-gray': '#E9EBF0',
        'moderate-blue': '#5357B6',
        'light-grayish-blue': '#C5C6EF',
        'soft-red': '#ED6368',
        'pale-red': '#FFB8BB'
      }
    },
    fontFamily: {
      sans: ['Rubik', 'sans-serif']
    },
    screens: {
      md: '768px'
    }
  },
  plugins: []
}
