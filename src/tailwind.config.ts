import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import alveusgg from "@alveusgg/data/src/tailwind";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [alveusgg],
  theme: {
    extend: {
      colors: {
        highlight: "#FF9F1C",
      },
      fontFamily: {
        sans: ["Nunito", ...fontFamily.sans],
      },
    },
  },
} satisfies Config;

export default config;
