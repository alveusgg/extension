import React from "react";

import styles from "./tooltip.module.scss";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  isShown: boolean;
  isOption?: boolean;
  offsetLeft?: number;
  offsetTop?: number;
  width?: number;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const tooltipStyle: React.CSSProperties = {
    opacity: props.isShown ? 1 : 0,
    width: `${props.width}rem` || "auto",
  };

  const tooltipClass = props.isOption
    ? styles.optionStyles
    : styles.defaultStyles;

  return (
    <>
      <div
        className={`${styles.sharedStyles} ${tooltipClass}`}
        style={tooltipStyle}
      >
        <span className={styles.triangle} />
        {props.text}
      </div>
      {props.children}
    </>
  );
};

export default Tooltip;
