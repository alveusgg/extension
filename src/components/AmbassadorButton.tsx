import { type MouseEventHandler } from "react";

import { useAmbassador } from "../hooks/useAmbassadors";
import { classes } from "../utils/classes";

interface AmbassadorButtonProps {
  ambassador: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function AmbassadorButton(props: AmbassadorButtonProps) {
  const { ambassador: ambassadorKey, onClick, className } = props;
  const ambassador = useAmbassador(ambassadorKey);

  if (!ambassador) return null;

  return (
    <button
      className={classes(
        "bg-alveus-green outline-highlight flex shrink-0 flex-col items-center justify-start rounded-lg text-center shadow-lg transition-[outline,filter] hover:outline hover:brightness-125 focus:outline",
        className,
      )}
      id={ambassadorKey}
      onClick={onClick}
      type="button"
    >
      <img
        className="aspect-[2.2] w-full shrink-0 rounded-t-lg object-cover"
        src={ambassador.image.src}
        alt={ambassador.image.alt}
        style={{ objectPosition: ambassador.image.position }}
      />

      <div className="my-auto px-1 pb-2 pt-2">
        <h2 className="text-sm">{ambassador.name}</h2>
        <h3 className="text-alveus-green-200 text-xs">
          {ambassador.species.name}
        </h3>
      </div>
    </button>
  );
}
