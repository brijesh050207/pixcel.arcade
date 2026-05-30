/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#030306',
        'accent-neon': '#00ffcc',
        'accent-purple': '#7000ff',
        'accent-pink': '#ff007f',
        'text-muted': '#8b8b9f',
      },
      boxShadow: {
        'neon': '0 0 25px rgba(0, 255, 220, 0.35)',
        'pink': '0 0 25px rgba(255, 0, 127, 0.35)',
      }
    },
  },
  plugins: [],
}