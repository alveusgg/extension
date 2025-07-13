import React from "react";
import Tooltip from "./Tooltip";
import { classes } from "../utils/classes";

/* 
<button
            className="absolute top-0 right-0 z-20 m-0 h-5 w-5 bg-transparent p-0"
            style={{ outline: "none" }}
            onClick={() => {
              alert("Dogear clicked!");
            }}
            aria-label="Dogear"
            type="button"
          >
            {/* Credits to https://codepen.io/rachelslurs/pen/xxoPKLg *\/
            <div
              className={classes(
                "absolute top-0 right-0 w-0 border-12 border-solid border-t-transparent border-r-transparent border-b-green-600 border-l-green-600 transition-all duration-300 ease-in-out",
                // "hover:border-16",
                "hover:scale-[1.6]",
              )}
            />
          </button>
*/

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
            "absolute top-0 right-0 w-0 border-12 border-solid border-t-transparent border-r-transparent border-b-alveus-green border-l-alveus-green transition-all duration-300 ease-in-out hover:scale-[1.6]",
          )}
        />
      </button>
    </Tooltip>
  );
}
