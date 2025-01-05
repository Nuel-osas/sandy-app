/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a9ff',
          500: '#0090ff',
          600: '#0072db',
          700: '#0058b0',
          800: '#004a91',
          900: '#003b77',
        },
        'sandy': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'game': {
          // Deep, rich background colors
          bg: '#0A0B0F',
          'bg-alt': '#12141C',
          // Accent colors
          accent: {
            primary: '#6D28D9',    // Deep purple
            secondary: '#4F46E5',  // Indigo
            success: '#059669',    // Emerald
            danger: '#DC2626',     // Red
            warning: '#D97706',    // Amber
          },
          // UI element colors
          ui: {
            dark: '#1E1F2B',
            DEFAULT: '#252736',
            light: '#2E303F',
          },
          // Text colors
          text: {
            primary: '#F3F4F6',
            secondary: '#9CA3AF',
            muted: '#6B7280',
          },
          // Gradient colors
          gradient: {
            start: '#6D28D9',
            mid: '#4F46E5',
            end: '#2563EB',
          },
          // Interactive element colors
          interactive: {
            hover: '#323444',
            active: '#3B3E52',
            disabled: '#1C1D28',
          },
          // Border colors
          border: {
            DEFAULT: '#2E303F',
            light: '#363848',
            focus: '#4F46E5',
          }
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-game': 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 50%, #2563EB 100%)',
        'gradient-game-alt': 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
      }
    },
  },
  plugins: [],
}