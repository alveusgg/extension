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
  type HTMLAttributes,
} from "react";

import { classes } from "../utils/classes";
import { mutableDOMRect } from "../utils/dom";

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
  const [above, setAbove] = useState(false);
  const [triangleMargin, setTriangleMargin] = useState<string>();

  // On hover, compute position of tooltip and show it
  const handleEnter = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
      if (!tooltipRef.current) return;

      const target = e.currentTarget as HTMLElement;
      const rect = mutableDOMRect(target.getBoundingClientRect());

      const offsetRect = target.offsetParent?.getBoundingClientRect();
      if (offsetRect) {
        rect.top -= offsetRect.top;
        rect.bottom -= offsetRect.top;
        rect.left -= offsetRect.left;
        rect.right -= offsetRect.left;
      }

      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      if (rect.right + tooltipRect.width > window.innerWidth) {
        // If the tooltip box is past the right edge of the page, position it to the top
        setAbove(true);
        setPosition({
          top: rect.top - rect.height / 2 - tooltipRect.height,
          left: window.innerWidth / 2 - tooltipRect.width / 2,
        });
        // Calculate margin so triangle will be pointing to info icon
        setTriangleMargin(`0 ${window.innerWidth / 2 - rect.right + 5}px 0 0`);
      } else {
        // Position tooltip to the left
        setAbove(false);
        setPosition({
          top: rect.top + rect.height / 2 - tooltipRect.height / 2,
          left: rect.right + 10,
        });
        // Have the triangle be in the center of the tooltip
        setTriangleMargin("-5px 0 0");
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

        return cloneElement(
          child as React.ReactElement<HTMLAttributes<HTMLElement>>,
          {
            onMouseEnter: handleEnter,
            onFocus: handleEnter,
            onMouseLeave: () => setShow(false),
            onBlur: () => setShow(false),
            "aria-describedby": id,
          },
        );
      }),
    [children, handleEnter, id],
  );

  return (
    <>
      {childrenWithProps}
      <div
        className="pointer-events-none fixed z-10 w-max rounded-lg bg-black/50 p-2 shadow-lg backdrop-blur transition-opacity"
        ref={tooltipRef}
        style={style}
        id={id}
        role="tooltip"
      >
        <div
          className={classes(
            "absolute border-[5px] border-solid border-transparent",
            above
              ? "right-1/2 top-full border-t-black/50"
              : "right-full top-1/2 border-r-black/50",
          )}
          style={{ margin: triangleMargin }}
        />
        {text}
      </div>
    </>
  );
};

export default Tooltip;
