import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import alveusgg from "@alveusgg/data/src/tailwind";
import scrollbar from "tailwind-scrollbar";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [alveusgg],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...fontFamily.sans],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;

export default config;
