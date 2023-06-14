import { useCallback, useEffect, useState } from "react";

import useIntelligentTimer from "./useIntelligentTimer";

// Hide the cursor after 5s of inactivity
const timeout = 5_000;

const useHiddenCursor = () => {
  // Hide the cursor if the user is inactive on the whole page
  const [startTimer] = useIntelligentTimer();
  const [hidden, setHidden] = useState(false);

  // Show the cursor for x milliseconds
  const show = useCallback(
    (time: number) => {
      setHidden(false);
      startTimer(() => setHidden(true), time);
    },
    [startTimer]
  );

  // Show the cursor as soon as the user interacts with the page
  useEffect(() => {
    const callback = () => show(timeout);

    document.addEventListener("mouseenter", callback);
    document.addEventListener("mousemove", callback);

    return () => {
      document.removeEventListener("mouseenter", callback);
      document.removeEventListener("mousemove", callback);
    };
  }, [show]);

  // Hide the cursor when inactive (not sleeping, as that happens on mouse exit)
  useEffect(() => {
    if (hidden) document.documentElement.style.cursor = "none";
    else document.documentElement.style.removeProperty("cursor");
  }, [hidden]);

  // Expose the state and the active function
  return [hidden, show] as [boolean, () => void];
};

export default useHiddenCursor;
