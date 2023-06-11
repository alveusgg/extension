import React, { useRef, useState } from 'react'

import { classes } from '../../classes'
import styles from './tooltip.module.scss'

interface TooltipProps {
  text: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  fontSize?: string;
  textContainerWidth?: string;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const [show, setShow] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // use ref and calculate position on render to determine where to place tooltip
  const containerRect = containerRef.current?.getBoundingClientRect();
  const tooltipRect = tooltipRef.current?.getBoundingClientRect();

  const containerCenter =
    (containerRect?.top ?? 0) + (containerRect?.height ?? 0) / 2;

  // set tooltip style based on incoming props
  const tooltipStyle = {
    opacity: show ? 1 : 0,
    // restrict width of tooltip with optional prop
    width: props.textContainerWidth ? props.textContainerWidth : "auto",
    fontSize: props.fontSize ? props.fontSize : "1rem",
  };

  return (
    <div
      className={props.className}
      ref={containerRef}
      aria-label={props.ariaLabel}
    >
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className={classes(props.className, styles.children)}
      >
        {props.children}
      </div>
      <div
        className={styles.tooltip}
        ref={tooltipRef}
        style={{
          ...tooltipStyle,
          top: containerCenter - (tooltipRect?.height ?? 0) / 2,
          left: (containerRect?.right ?? 0) + 10,
        }}
      >
        <span className={styles.triangle} />
        {props.text}
      </div>
    </div>
  );
};

export default Tooltip;
