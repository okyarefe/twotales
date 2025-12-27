/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}", // for App Router

    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'subtitle': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      colors: {
        'accent-gold': '#FFA500',
        'accent-gold-light': '#FFD700',
        'text-muted': '#6B7280',
        'text-light': '#9CA3AF',
      },
    },
  },
  plugins: [],
};

export default config;
