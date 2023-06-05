import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  width?: number;
  isOption?: boolean;
  isShown: boolean;
  offsetLeft?: number;
  offsetTop?: number;
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
    zIndex: 3,
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
