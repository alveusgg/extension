import { classes } from "../utils/classes";

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
        "bg-alveus-green scrollbar-thin scrollbar-track-alveus-green-900 scrollbar-thumb-alveus-green flex max-h-full w-[32rem] max-w-full flex-col items-center justify-between overflow-y-auto rounded-3xl p-5 shadow",
        className,
      )}
    >
      {title && (
        <h2 className="mb-2 text-center font-serif text-3xl font-bold">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
