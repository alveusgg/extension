import { classes } from "../utils/classes";

import Ring from "./Ring";

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Card(props: CardProps) {
  const { children, title, className } = props;

  return (
    <div
      className={classes(
        "scrollbar-thin flex max-h-full w-[32rem] max-w-full flex-col items-center justify-between overflow-y-auto rounded-3xl bg-alveus-green p-5 shadow-sm scrollbar-thumb-alveus-green scrollbar-track-alveus-green-900",
        !/\b(static|sticky|fixed|absolute)\b/.test(className || "") &&
          "relative",
        className,
      )}
    >
      {title && (
        <h2 className="mb-2 text-center font-serif text-3xl font-bold text-balance">
          {title}
        </h2>
      )}
      {children}

      <Ring className="rounded-3xl" />
    </div>
  );
}
