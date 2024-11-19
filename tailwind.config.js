/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,js,tsx,jsx,vue}'],
  theme: {
    extend: {
      screens:{
        'sm':"500px",
        'md':"768px",
        'lg':"1024px",
        'xl':'1280px',
        '2xl':"1536px"
      }
    },
  },
  plugins: [],
  darkMode:"class"
}

