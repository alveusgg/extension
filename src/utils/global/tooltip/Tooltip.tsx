import React, {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  useMemo,
  useId,
  type FocusEvent,
} from "react";

import styles from "./tooltip.module.scss";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  fontSize?: string;
  maxWidth?: string;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { text, children, fontSize, maxWidth } = props;

  const id = useId();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // On hover, compute position of tooltip and show it
  const handleEnter = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
      if (!tooltipRef.current) return;

      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setPosition({
        top: rect.top + rect.height / 2 - tooltipRect.height / 2,
        left: rect.right + 10,
      });
      setShow(true);
    },
    []
  );

  // Compute the style of the tooltip
  const style = useMemo(
    () => ({
      opacity: show ? 1 : 0,
      top: position.top,
      left: position.left,
      maxWidth,
      fontSize,
    }),
    [show, position, maxWidth, fontSize]
  );

  // Add event listeners + refs to the children to show/hide tooltip
  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child as React.ReactElement, {
          onMouseEnter: handleEnter,
          onFocus: handleEnter,
          onMouseLeave: () => setShow(false),
          onBlur: () => setShow(false),
          "aria-describedby": id,
        });
      }),
    [children, handleEnter, id]
  );

  return (
    <>
      {childrenWithProps}
      <div
        className={styles.tooltip}
        ref={tooltipRef}
        style={style}
        id={id}
        role="tooltip"
      >
        <span className={styles.triangle} />
        {text}
      </div>
    </>
  );
};

export default Tooltip;
