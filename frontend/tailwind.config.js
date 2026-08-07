/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#010804', // Very deep forest black
        surface: '#031408', // Dark green glass surface
        primary: '#10B981', // Emerald 500
        accent: '#D4AF37', // Premium Gold
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
