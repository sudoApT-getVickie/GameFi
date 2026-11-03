import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: "#00E676",
          dark: "#0B0E14",
          surface: "#141A23",
          border: "#222D3D",
          amber: "#FFB300",
          cyan: "#00E5FF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
