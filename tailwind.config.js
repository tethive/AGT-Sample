/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      /**
       * Light theme.
       *
       * The two scales keep their roles rather than their values: `ink` is
       * always the surface and `bone` is always the type. Inverting what they
       * resolve to flips the whole site without touching a single component
       * class — and makes going back, or adding a toggle, a config change.
       *
       * ink  — paper surfaces, lightest first
       * bone — type and hairlines, darkest first
       */
      colors: {
        ink:   { DEFAULT: "#F6F4F0", 800: "#EFECE6", 700: "#E7E3DB", 600: "#DBD6CC", 500: "#C9C3B7" },
        steel: { DEFAULT: "#1F6FA8", 400: "#1C6396", 300: "#17557F", 600: "#164B70", 700: "#CBE0F0" },
        bone:  { DEFAULT: "#0F1319", 600: "#454C56", 500: "#6B727B", 400: "#949AA2" },
        sand:  { DEFAULT: "#9A7B18" },
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
