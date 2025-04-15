/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'whatsapp': {
          'light': '#25D366',
          'DEFAULT': '#128C7E',
          'dark': '#075E54',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        'whatsapp-chat': {
          light: '#E5DDD5',
          dark: '#0B141A',
        },
      },
    },
  },
  plugins: [],
}
