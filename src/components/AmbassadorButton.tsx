import { type MouseEventHandler } from "react";

import { useAmbassador } from "../hooks/useAmbassadors";
import { classes } from "../utils/classes";
import Ring from "./Ring";

interface AmbassadorButtonProps {
  ambassador: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  className?: string;
}

export default function AmbassadorButton(props: AmbassadorButtonProps) {
  const { ambassador: ambassadorKey, onClick, active, className } = props;
  const ambassador = useAmbassador(ambassadorKey);

  if (!ambassador) return null;

  return (
    <button
      className={classes(
        "group/button relative flex shrink-0 flex-col items-center justify-start rounded-lg bg-alveus-green text-center shadow-lg transition-[filter] hover:brightness-125",
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
        loading="lazy"
      />

      <div className="my-auto px-1 pt-2 pb-2">
        <h2 className="text-sm text-balance">{ambassador.name}</h2>
        <h3 className="text-xs text-balance text-alveus-green-200">
          {ambassador.species.name}
        </h3>
      </div>

      <Ring active={active} />
    </button>
  );
}
