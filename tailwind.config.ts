import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0A3D91", // primary Bluenord colour
          50: "#EEF3FB",
          100: "#DCE7F6",
          200: "#B7CEF0",
          300: "#8CB3E7",
          400: "#5A90D9",
          500: "#2D6EC8",
          600: "#1F56A9",
          700: "#184484",
          800: "#123362",
          900: "#0C2547"
        }
      }
    },
  },
  plugins: [],
};

export default config;
