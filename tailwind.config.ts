<<<<<<< HEAD
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
=======

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
    },
>>>>>>> b33a77d684d3edeaa2535eb7ce3be5ee011ec324
  },
  plugins: [],
};

export default config;
<<<<<<< HEAD
=======

>>>>>>> b33a77d684d3edeaa2535eb7ce3be5ee011ec324
