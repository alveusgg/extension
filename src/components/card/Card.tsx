import { classes } from "../../utils/classes";

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
        "bg-alveus-green scrollbar-thin scrollbar-track-alveus-green-900 scrollbar-thumb-alveus-green mx-4 my-6 flex max-h-full w-[32rem] max-w-full flex-col items-center justify-between overflow-y-auto rounded-3xl p-5 shadow",
        className,
      )}
    >
      {title && <h2 className="mb-2 text-center text-3xl">{title}</h2>}
      {children}
    </div>
  );
}
