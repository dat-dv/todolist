/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./public/**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        mono: ['"Roboto Mono"', "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        primary: {
          50: "#f5f6fb",
          100: "#eaedf7",
          200: "#cfd6ef",
          300: "#aeb4df",
          400: "#7f83c2",
          500: "#5659a3",
          DEFAULT: "#23243D",
          600: "#1f2340",
          700: "#18182b",
          800: "#12121b",
          900: "#0a0a0f",
        },
        background: {
          light: "#F5F6FB",
          DEFAULT: "#23243D",
          dark: "#12121B",
        },
      },
      keyframes: {
        loading: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        loading: "loading 2s linear infinite",
      },
    },
  },
  plugins: [],
};
