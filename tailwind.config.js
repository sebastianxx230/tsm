/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f3f7',
          100: '#ebe6ef',
          200: '#d4c9df',
          300: '#b3a1c6',
          400: '#8e75a8',
          500: '#714b67',
          600: '#5f3e57',
          700: '#4d3347',
          800: '#3b2837',
          900: '#2a1d28',
        },
        teal: {
          50: '#effbfb',
          100: '#d7f5f4',
          200: '#b0eae9',
          300: '#7ad9d8',
          400: '#3fbfbd',
          500: '#1aa3a1',
          600: '#017e84',
          700: '#016670',
          800: '#065058',
          900: '#0a3f47',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(0,0,0,0.04), 0 1px 3px 0 rgba(0,0,0,0.06)',
        cardHover: '0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 6px -1px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
