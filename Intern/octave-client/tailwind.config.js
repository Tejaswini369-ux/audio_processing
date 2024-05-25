// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#2C99CE',
        'blue-hover': '#E3F2FD',
        'greyy': '#F0ECEC',
        'orange': '#ff6600',
        'green': '#689F38',
        'blue-button':'#A9CBE6',
      },
      keyframes: {
        slideIn : {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut : {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        slideIn: 'slideIn 2s',
        slideOut: 'slideOut 2s',
      }
    },
  },
  plugins: [],
};
