import React from "react";
import Tooltip from "./Tooltip";
import { classes } from "../utils/classes";

export default function CardDogear(props: {
  onClick?: () => void;
  onHover?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <Tooltip text="Click me to flip the card!">
      <button
        className="absolute top-0 right-0 z-20 m-0 h-5 w-5 bg-transparent p-0"
        style={{ outline: "none" }}
        onClick={props.onClick}
        aria-label="Dogear"
        type="button"
      >
        {/* Credits to https://codepen.io/rachelslurs/pen/xxoPKLg */}
        <div
          className={classes(
            "absolute top-0 right-0 w-0 border-13 border-solid border-t-transparent border-r-transparent border-b-alveus-green border-l-alveus-green transition-all duration-300 ease-in-out hover:scale-[1.6] sm:border-15 md:border-18 lg:border-20",
          )}
        />
      </button>
    </Tooltip>
  );
}
