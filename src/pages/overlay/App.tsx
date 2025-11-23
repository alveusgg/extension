import { useEffect, useCallback } from "react";

import { classes } from "../../utils/classes";
import { AmbassadorsProvider } from "../../hooks/useAmbassadors";

import useHiddenCursor from "./hooks/useHiddenCursor";
import useSettings from "./hooks/useSettings";
import useSleeping from "./hooks/useSleeping";

import Overlay from "./components/overlay/Overlay";

// Hide the overlay after 5s of inactivity
const timeout = 5_000;

export default function App() {
  // Show/hide the overlay based on mouse movement
  const settings = useSettings();
  const {
    sleeping,
    wake,
    sleep,
    caffeinate,
    uncaffeinate,
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

  return (
    <AmbassadorsProvider>
      <div
        className={classes(
          "relative mx-4 h-full w-full transition-opacity",
          sleeping &&
            !(
              process.env.NODE_ENV === "development" &&
              settings.disableOverlayHiding.value
            )
            ? "opacity-0 [&_*]:pointer-events-none"
            : "opacity-100",
        )}
        onMouseEnter={interacted}
        onMouseMove={interacted}
        onWheel={interacted}
        onTouchMove={interacted}
        onKeyUp={(event) => {
          // onFocus events capture when we click on the element in addition to
          // tabbing
          if (event.key === "Tab") {
            caffeinate();
          }
        }}
        onKeyDown={() => interacted()}
        onMouseLeave={sleep}
        onBlur={() => uncaffeinate(timeout)}
      >
        <Overlay />
      </div>
    </AmbassadorsProvider>
  );
}
