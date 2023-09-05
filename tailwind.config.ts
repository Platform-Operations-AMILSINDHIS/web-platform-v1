import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)"],
        heading: ["var(--font-satoshi)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
