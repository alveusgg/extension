import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import alveusgg from "@alveusgg/data/build/tailwind";
import scrollbar from "tailwind-scrollbar";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [alveusgg],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PT Sans", ...fontFamily.sans],
        serif: ["PT Serif", ...fontFamily.serif],
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;

export default config;
