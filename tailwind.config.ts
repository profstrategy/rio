import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'sync': ['"Syncopate"', 'sans-serif'],
      },
      colors: {
        // --- Existing RIO Colors ---
        'rio-blue': '#00D2FF',
        'rio-green': '#3AFFAD',
        
        // --- NEW BUTTON COLORS (for app-button.tsx) ---
        'rio-sky': {
          500: '#00D2FF', // Using RIO blue as base
          800: '#0284c7', // Darker blue
        },
        'fire-sky': {
          500: '#FF8C00', // Orange for secondary
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;