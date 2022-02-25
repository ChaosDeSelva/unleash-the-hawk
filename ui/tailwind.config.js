const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        hawk: {
          100: '#ccf5f4',
          200: '#99eae8',
          300: '#66e0dd',
          400: '#33d5d1',
          500: '#00cbc6',
          600: '#00a29e',
          700: '#007a77',
          800: '#00514f',
          900: '#002928',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
