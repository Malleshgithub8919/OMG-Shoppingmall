/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#050c18',
          900: '#0a1525',
          800: '#0f1b2d',
          700: '#162236',
          600: '#1e3251',
          500: '#253d62',
        },
        pink: {
          primary: '#f63d7a',
          strong: '#e73376',
          soft: 'rgba(246,61,122,0.12)',
          glow: 'rgba(246,61,122,0.35)',
        },
        gold: {
          primary: '#eaaf38',
          strong: '#d79d2e',
          light: '#f9e7af',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ffdb9b 0%, #f4c553 16%, #f2bb45 40%, #f9e7af 100%)',
        'pink-gradient': 'linear-gradient(135deg, #f63d7a, #ff5f96)',
        'hero-overlay': 'linear-gradient(105deg, rgba(5,10,20,0.92) 0%, rgba(8,14,24,0.72) 40%, rgba(8,14,24,0.25) 100%)',
        'dark-footer': 'linear-gradient(160deg, #0a1525 0%, #0f1b2d 100%)',
      },
      animation: {
        'hero-zoom': 'heroZoom 18s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.2s ease-in-out infinite',
        'scroll-dot': 'scrollDot 1.8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        heroZoom: {
          '0%': { transform: 'scale(1.08) translateX(0px)' },
          '100%': { transform: 'scale(1.14) translateX(-12px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(246,61,122,0.4)' },
          '50%': { boxShadow: '0 0 0 14px rgba(246,61,122,0)' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(24px)', opacity: 0 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'hero': '0 30px 90px rgba(5,10,20,0.28)',
        'card': '0 18px 40px rgba(19,35,61,0.10)',
        'card-hover': '0 28px 60px rgba(19,35,61,0.16)',
        'pink': '0 14px 28px rgba(244,76,132,0.28)',
        'pink-strong': '0 18px 40px rgba(244,76,132,0.40)',
        'gold': '0 12px 28px rgba(234,175,56,0.30)',
        'nav': '0 8px 22px rgba(15,27,45,0.08)',
        'float': '0 16px 30px rgba(18,35,61,0.12)',
      },
    },
  },
  plugins: [],
};
