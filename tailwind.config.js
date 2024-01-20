/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#d4eaf7',
          200: '#b6ccd8',
          300: '#3b3c3d',
        },
        accent: {
          100: '#71c4ef',
          200: '#00668c',
        },
        text: {
          100: '#1d1c1c',
          200: '#313d44',
        },
        bg: {
          100: '#fffefb',
          200: '#f5f4f1',
          300: '#cccbc8',
        },
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'custom': '900px', // Nuevo breakpoint personalizado
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};

