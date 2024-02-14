/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    fontSize: {
      sm: '0.875rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },

    extend: {
      colors: {
        gray900: '#121214',
        gray800: '#202024',
        gray500: '#8D8D99',
        gray300: '#c4c4cc',
        gray100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e',
        'grad-green': '#1ea483',
        'grad-purple': '#7465d4',
      },
      maxWidth: {
        home: 'calc(100vw - (100vw - 1080px)/2)',
      },
    },
  },
  plugins: [],
}
