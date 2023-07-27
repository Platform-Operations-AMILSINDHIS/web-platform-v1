import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
        heading: ["var(--font-eudoxus)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
