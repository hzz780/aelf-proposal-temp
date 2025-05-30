import type { Config } from "tailwindcss";

console.log('process.env.NODE_ENV', process.env.NODE_ENV, process.env.NODE_ENV === 'production');

const config: Config = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  // purge: {
  //   content: [
  //     './pages/**/*.{js,ts,jsx,tsx}',
  //     './components/**/*.{js,ts,jsx,tsx}',
  //   ],
  //   enabled: process.env.NODE_ENV === 'production', // Enable purge in production
  // },
};
export default config;
