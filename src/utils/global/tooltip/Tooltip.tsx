import React, { useState } from "react";

import styles from "./tooltip.module.scss";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  title: string;
  textContainerWidth?: string;
  leftOffset?: string;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const [show, setShow] = useState(false);

  const tooltipStyle: React.CSSProperties = {
    opacity: show ? 1 : 0,
    width: props.textContainerWidth ? props.textContainerWidth : "max-content",
    left: props.leftOffset,
  };

  return (
    <>
    <div className={styles.wrapper}
    // title={props.title}
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
    >
      <div className={styles.children}>
        {props.children}
      </div>
      <div
        className={styles.sharedStyles}
        style={tooltipStyle}
      >
        <span className={styles.triangle} />
        {props.text}
      </div>
    </div>
    </>
  );
};

export default Tooltip;
