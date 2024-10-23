import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import alveusgg from "@alveusgg/data/src/tailwind";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [alveusgg],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...fontFamily.sans],
      },
    },
  },
} satisfies Config;

export default config;
