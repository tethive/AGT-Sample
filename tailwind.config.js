/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink:   { DEFAULT: "#07090C", 800: "#0B0E13", 700: "#11151C", 600: "#181D26", 500: "#222935" },
        steel: { DEFAULT: "#2E7FB8", 400: "#4FA3DC", 300: "#7CC2EE", 600: "#1F5F8E", 700: "#164564" },
        bone:  { DEFAULT: "#EDEAE4", 600: "#B8B4AC", 500: "#8A857C", 400: "#5E5A53" },
        sand:  { DEFAULT: "#C9A227" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: { tightest: "-0.045em", mega: "-0.055em" },
      screens: { xs: "480px" },
    },
  },
  plugins: [],
};
