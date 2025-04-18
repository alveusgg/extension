import { classes } from "../utils/classes";

interface RingProps {
  active?: boolean;
  className?: string;
}

export default function Ring({ active = false, className }: RingProps) {
  return (
    <div
      className={classes(
        "pointer-events-none absolute inset-0 ring-3 transition-shadow ring-inset",
        active
          ? "ring-highlight"
          : "ring-white/25 group-hover/button:ring-highlight group-focus/button:ring-highlight",
        !/\brounded-/.test(className || "") && "rounded-lg",
        className,
      )}
    />
  );
}
