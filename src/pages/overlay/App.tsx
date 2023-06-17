import React, { useEffect, useCallback } from "react";

import { classes } from "../../utils/classes";
import useHiddenCursor from "./hooks/useHiddenCursor";
import useSettings from "./hooks/useSettings";
import useSleeping from "./hooks/useSleeping";
import useScrolling from "./hooks/useScrolling";

import Overlay from "./components/overlay/Overlay";
import styles from "./App.module.scss";

// Hide the overlay after 5s of inactivity
const timeout = 5_000;

export default function App() {
  // Show/hide the overlay based on mouse movement
  const {
    sleeping,
    wake,
    sleep,
    on: addSleepListener,
    off: removeSleepListener,
  } = useSleeping();

  // When the user interacts, show the overlay
  const interacted = useCallback(() => wake(timeout), [wake]);

  // Hide the cursor when the user is idle
  const [, showCursor] = useHiddenCursor();

  // When the overlay is awoken, show the cursor
  useEffect(() => {
    addSleepListener("wake", showCursor);
    return () => removeSleepListener("wake", showCursor);
  }, [addSleepListener, removeSleepListener, showCursor]);

  // When a user scrolls, treat it as an interaction
  const {
    ref: scrollRef,
    on: addScrollListener,
    off: removeScrollListener,
  } = useScrolling();
  useEffect(() => {
    addScrollListener(interacted);
    return () => removeScrollListener(interacted);
  }, [addScrollListener, removeScrollListener, interacted]);

  // Block sleeping hiding the overlay if dev toggle is on
  const settings = useSettings();
  let visibilityClass = sleeping ? styles.hidden : styles.visible;
  if (
    process.env.NODE_ENV === "development" &&
    settings.disableOverlayHiding.value
  )
    visibilityClass = styles.visible;

  return (
    <div
      ref={scrollRef}
      className={classes(styles.app, visibilityClass)}
      onMouseEnter={interacted}
      onMouseMove={interacted}
      onMouseLeave={sleep}
    >
      <Overlay />
    </div>
  );
}
