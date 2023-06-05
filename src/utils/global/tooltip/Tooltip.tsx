import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  isShown: boolean;
  isOption?: boolean;
  offsetLeft?: number;
  offsetTop?: number;
  width?: number;
}

// TODO: dynamic styles converted to tooltip.module.scss as import
const Tooltip: React.FC<TooltipProps> = (props) => {
  const tooltipStyle: React.CSSProperties = {
    backgroundColor: "#18181B",
    borderRadius: "0.5rem",
    color: "white",
    fontSize: props.isOption ? "0.8rem" : "1rem",
    left: props.isOption ? "120%" : `${props.offsetLeft}rem`,
    opacity: props.isShown ? 1 : 0,
    padding: "0.5rem",
    position: "absolute",
    textAlign: "left",
    top: props.isOption ? "50%" : `${props.offsetTop}rem`,
    transition: "opacity 0.15s ease-in-out",
    transform: "translateX(0%) translateY(-50%)",
    whiteSpace: props.isOption ? "nowrap" : "normal",
    width: `${props.width}rem` || "auto",
    zIndex: 1, // set to 1 to be above ambassador list. although without this line it still seems to work (@mostafa-damir)
  };

  const tooltipArrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    right: "100%",
    marginTop: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "transparent #18181B transparent transparent",
  };

  return (
    <>
      <div style={tooltipStyle}>
        <span style={tooltipArrowStyle} />
        {props.text}
      </div>
      {props.children}
    </>
  );
};

export default Tooltip;
