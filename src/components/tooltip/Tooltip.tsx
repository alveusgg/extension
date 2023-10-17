import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  useMemo,
  useId,
  type FocusEvent,
  Children,
  isValidElement,
  cloneElement,
} from "react";

import styles from "./tooltip.module.scss";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  fontSize?: string;
  maxWidth?: string;
}
const Tooltip = (props: TooltipProps) => {
  const { text, children, fontSize, maxWidth } = props;

  const id = useId();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isOverflowing, setIsOverflowing] = useState(false);

  // On hover, compute position of tooltip and show it
  const handleEnter = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
      if (!tooltipRef.current) return;

      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      if (rect.right + tooltipRect.width > window.innerWidth) {
        // If the tooltip box is past the right edge of the page, position it to the top
        setIsOverflowing(true);
        setPosition({
          top: rect.top - rect.height / 2 - tooltipRect.height,
          left: window.innerWidth / 2 - tooltipRect.width / 2,
        });
        // Calculate margin so triangle will be pointing to info icon
        const calcTriangleMargin = `${
          window.innerWidth / 2 - rect.right + 5
        }px`;
        document.documentElement.style.setProperty(
          "--tooltip-margin-right",
          calcTriangleMargin,
        );
      } else {
        // Position tooltip to the left
        setIsOverflowing(false);
        setPosition({
          top: rect.top + rect.height / 2 - tooltipRect.height / 2,
          left: rect.right + 10,
        });
      }
      setShow(true);
    },
    [],
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
    [show, position, maxWidth, fontSize],
  );

  // Add event listeners + refs to the children to show/hide tooltip
  const childrenWithProps = useMemo(
    () =>
      Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child as React.ReactElement, {
          onMouseEnter: handleEnter,
          onFocus: handleEnter,
          onMouseLeave: () => setShow(false),
          onBlur: () => setShow(false),
          "aria-describedby": id,
        });
      }),
    [children, handleEnter, id],
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
        <div
          className={
            isOverflowing ? styles.triangle_bottom : styles.triangle_left
          }
        />
        {text}
      </div>
    </>
  );
};

export default Tooltip;
