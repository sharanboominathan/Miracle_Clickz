import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // theme-aware: flip between dark & light via CSS variables
        white: "rgb(var(--fg-rgb) / <alpha-value>)",
        black: "rgb(var(--bg-rgb) / <alpha-value>)",
        // literal: never flip (cinematic surfaces — hero, viewer, posters)
        chalk: "rgb(255 255 255 / <alpha-value>)",
        jet: "rgb(0 0 0 / <alpha-value>)",
        gold: {
          DEFAULT: "#D6B25E",
          soft: "#E8CD8C",
          deep: "#A3823B",
          dim: "rgba(214,178,94,0.14)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        cine: "0.35em",
        wide2: "0.18em",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
