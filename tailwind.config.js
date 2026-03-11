/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0a0a0b',
        panel: '#111114',
        muted: '#a1a1aa',
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0,0,0,0.28)',
      },
      backgroundImage: {
        radial: 'radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 50%)',
      },
    },
  },
  plugins: [],
}
