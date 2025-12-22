/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff0ed',
          100: '#ffe0d9',
          200: '#ffc1b3',
          300: '#ff9882',
          400: '#ff6244',
          500: '#ff2e11', // Primary Orange-Red
          600: '#eb1e04',
          700: '#c21400',
          800: '#9f1303',
          900: '#84160a',
          950: '#480700',
        },
        surface: {
          dark: '#0d0d0f',
          card: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      boxShadow: {
        'glow-brand': '0 0 20px rgba(255, 46, 17, 0.4), 0 0 40px rgba(255, 46, 17, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'gradient-brand': 'linear-gradient(135deg, rgb(255, 46, 17), rgb(167, 146, 119))',
      }
    },
  },
  plugins: [],
};
