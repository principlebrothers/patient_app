/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'yarysa-primary': '#030e2b',
        'yarysa-medication': '#fddfd3',
        'yarysa-consulation': '#c0b5e1',
        'yarysa-medication-text': '#e98862',
        'yarysa-consultation-text': '#7c4fff',
      },
      fontFamily: {
        sen: ['Sen'],
      },
      borderRadius: {
        'custom-bottom': '8rem',
      },
    },
  },
  plugins: [],
};

