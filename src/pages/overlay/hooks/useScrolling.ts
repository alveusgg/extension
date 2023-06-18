import { useCallback, useEffect, useRef, useState } from "react";

// Stop considering the user to be scrolling 100ms after the last scroll event
const activityTimeout = 100;

const useScrolling = () => {
  // Allow subscriptions to scroll events
  const [callbacks, setCallbacks] = useState<((e: Event) => void)[]>([]);
  const on = useCallback((fn: (e: Event) => void) => {
    setCallbacks((prev) => [...prev, fn]);
  }, []);
  const off = useCallback((fn: (e: Event) => void) => {
    setCallbacks((prev) => prev.filter((f) => f !== fn));
  }, []);

  // Listen for the wheel event (user scrolling on desktop)
  const onWheelTimer = useRef<NodeJS.Timeout | null>(null);
  const onWheelActive = useRef(false);
  const onWheel = useCallback(() => {
    onWheelActive.current = true;

    if (onWheelTimer.current) clearTimeout(onWheelTimer.current);
    onWheelTimer.current = setTimeout(() => {
      onWheelActive.current = false;
    }, activityTimeout);
  }, []);

  // Listen for touch move events (user scrolling on mobile)
  const onTouchMoveTimer = useRef<NodeJS.Timeout | null>(null);
  const onTouchMoveActive = useRef(false);
  const onTouchMove = useCallback(() => {
    onTouchMoveActive.current = true;

    if (onTouchMoveTimer.current) clearTimeout(onTouchMoveTimer.current);
    onTouchMoveTimer.current = setTimeout(() => {
      onTouchMoveActive.current = false;
    }, activityTimeout);
  }, []);

  // Clean up the timers when the component unmounts
  useEffect(() => {
    return () => {
      if (onWheelTimer.current) clearTimeout(onWheelTimer.current);
      if (onTouchMoveTimer.current) clearTimeout(onTouchMoveTimer.current);
    };
  }, []);

  // Call the subscribers if the user is actively scrolling
  const onScroll = useCallback(
    (e: Event) => {
      if (!onWheelActive.current && !onTouchMoveActive.current) return;
      callbacks.forEach((fn) => fn(e));
    },
    [callbacks]
  );

  // Bind the event listeners to the scrollable element
  const cleanup = useRef<() => void>();
  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (cleanup.current) {
        cleanup.current();
        cleanup.current = undefined;
      }

      if (!node) return;

      node.addEventListener("scroll", onScroll, true);
      node.addEventListener("wheel", onWheel, true);
      node.addEventListener("touchmove", onTouchMove, true);

      cleanup.current = () => {
        node.removeEventListener("scroll", onScroll, true);
        node.removeEventListener("wheel", onWheel, true);
        node.removeEventListener("touchmove", onTouchMove, true);
      };
    },
    [onScroll, onWheel, onTouchMove]
  );

  return { ref, on, off };
};

export default useScrolling;
