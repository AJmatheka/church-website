/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f8faf6',
          100: '#f1f5ed',
          200: '#e9edc9',
          300: '#d4e0b8',
          400: '#ccd5ae',
          500: '#b8c99a',
          600: '#a3b886',
          700: '#8ea672',
          800: '#79945e',
          900: '#64824a',
        },
        cream: {
          50: '#fefae0',
          100: '#fdf8d6',
          200: '#fcf5cc',
          300: '#fbf2c2',
          400: '#faedcd',
          500: '#f9e8b8',
          600: '#f8e3a3',
          700: '#f7de8e',
          800: '#f6d979',
          900: '#f5d464',
        },
        earth: {
          50: '#f7f3f0',
          100: '#efe7e1',
          200: '#e7dbd2',
          300: '#dfcfc3',
          400: '#d4a373',
          500: '#c8956a',
          600: '#bc8761',
          700: '#b07958',
          800: '#a46b4f',
          900: '#985d46',
        },
        primary: {
          50: '#f8faf6',
          100: '#f1f5ed',
          200: '#e9edc9',
          300: '#d4e0b8',
          400: '#ccd5ae',
          500: '#b8c99a',
          600: '#a3b886',
          700: '#8ea672',
          800: '#79945e',
          900: '#64824a',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'floating': 'floating 3s ease-in-out infinite',
        'slideUp': 'slideUp 0.8s ease-out forwards',
        'fadeIn': 'fadeIn 1s ease-out forwards',
        'pulseGlow': 'pulseGlow 2s infinite',
        'gradientShift': 'gradientShift 3s ease infinite',
        'textReveal': 'textReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(204, 213, 174, 0.3)',
        'glow-lg': '0 0 40px rgba(204, 213, 174, 0.6)',
      }
    },
  },
  plugins: [],
}