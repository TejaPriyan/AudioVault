/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#05060B',
        panel: '#0B0F1A',
        cyanNeon: '#00F0FF',
        violetNeon: '#8B5CF6',
        emeraldNeon: '#00FF88',
      }
    }
  },
  plugins: [],
};
