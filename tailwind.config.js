/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF7E8',
          100: '#F5ECC4',
          200: '#EDD98A',
          300: '#E4C656',
          400: '#D9B43A',
          500: '#C9A227', // primary gold
          600: '#A8851D',
          700: '#876818',
          800: '#5C4710',
          900: '#3A2D0A',
        },
        ink: {
          50: '#F6F6F4',
          100: '#E8E8E4',
          200: '#C9C9C2',
          300: '#9C9C92',
          400: '#6E6E64',
          500: '#4A4A40',
          600: '#33332C',
          700: '#22221C',
          800: '#161612',
          900: '#0B0B08',
        },
        cream: '#F7F2E7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'kenburns': 'kenburns 20s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        kenburns: {
          '0%, 100%': { transform: 'scale(1) translate(0,0)' },
          '50%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E4C656 50%, #C9A227 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201,162,39,0.4), transparent)',
        'dark-overlay': 'linear-gradient(180deg, rgba(11,11,8,0) 0%, rgba(11,11,8,0.85) 100%)',
      },
      letterSpacing: {
        'widest-2': '0.3em',
      },
    },
  },
  plugins: [],
}
