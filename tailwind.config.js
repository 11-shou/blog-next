/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',
        secondary: '#10B981',
        'primary-light': '#E8F0FE',
        'secondary-light': '#ECFDF5',
        'mi-blue': '#0094FF',
        'mi-blue-light': '#4FC3F7',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delay-1': 'float 3s ease-in-out 0.2s infinite',
        'float-delay-2': 'float 3s ease-in-out 0.4s infinite',
        'float-delay-3': 'float 3s ease-in-out 0.6s infinite',
        'float-delay-4': 'float 3s ease-in-out 0.8s infinite',
        'float-delay-5': 'float 3s ease-in-out 1s infinite',
        'gradient-x': 'gradient-x 3s linear infinite',
        'scroll-down': 'scroll-down 2s ease-in-out infinite',
        'hue': 'hue 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'scroll-down': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        hue: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#333',
            a: {
              color: '#1A73E8',
              '&:hover': {
                color: '#1557B0',
              },
            },
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#111827',
            },
            h3: {
              color: '#111827',
            },
            h4: {
              color: '#111827',
            },
            code: {
              color: '#1A73E8',
              backgroundColor: '#E8F0FE',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#1F2937',
              color: '#F9FAFB',
            },
            blockquote: {
              borderLeftColor: '#1A73E8',
              color: '#4B5563',
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mi-blue-gradient': 'linear-gradient(90deg, #0094FF 0%, #4FC3F7 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide')
  ],
} 