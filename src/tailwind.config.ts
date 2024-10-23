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
      // TODO: Abstract into alveusgg/data
      gridTemplateColumns: {
        ...Object.fromEntries(
          Array.from({ length: 12 }, (_, i) => [
            `${i + 1}-auto`,
            `repeat(${i + 1}, auto)`,
          ]),
        ),
      },
    },
  },
} satisfies Config;

export default config;
