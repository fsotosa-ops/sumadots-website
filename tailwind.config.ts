import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Esto permite que el switch de sol/luna funcione
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;