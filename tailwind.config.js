/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090C15',
        cardBg: '#131B2E',
        sidebarBg: '#0F172A',
      }
    },
  },
  plugins: [],
}
