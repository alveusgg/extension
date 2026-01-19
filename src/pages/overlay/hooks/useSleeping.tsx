import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import useIntelligentTimer from "./useIntelligentTimer";

type Events = {
  wake: ((time: number | undefined) => void) | (() => void);
  sleep: () => void;
};

type Event = keyof Events;

export type Sleeping = {
  sleeping: boolean;
  wake: (time: number) => void;
  sleep: () => void;
  caffeinate: () => void;
  uncaffeinate: (time: number) => void;
  on: (event: Event, fn: Events[Event]) => void;
  off: (event: Event, fn: Events[Event]) => void;
};

const Context = createContext<Sleeping | undefined>(undefined);

export const SleepingProvider = ({ children }: { children: ReactNode }) => {
  const [startTimer, stopTimer] = useIntelligentTimer();
  const [sleeping, setSleeping] = useState(false);
  const [isCaffeinated, setCaffeinated] = useState(false);

  // Allow subscriptions to wake/sleep events
  // This allows logic to know when the overlay was re-awoken, even if it was already awake
  const [callbacks, setCallbacks] = useState<{ [k in Event]: Events[k][] }>({
    wake: [],
    sleep: [],
  });
  const on = useCallback<Sleeping["on"]>((event, fn) => {
    setCallbacks((prev) => ({ ...prev, [event]: [...prev[event], fn] }));
  }, []);
  const off = useCallback<Sleeping["off"]>((event, fn) => {
    setCallbacks((prev) => ({
      ...prev,
      [event]: prev[event].filter((f) => f !== fn),
    }));
  }, []);

  // Wake the overlay for x milliseconds
  const wake = useCallback(
    (time: number) => {
      if (isCaffeinated) {
        return;
      }

      console.debug("wake");

      setSleeping(false);
      callbacks.wake.forEach((fn) => fn(time));
      startTimer(() => setSleeping(true), time);
    },
    [callbacks.wake, startTimer, isCaffeinated],
  );

  // Immediately sleep the overlay
  const sleep = useCallback(() => {
    if (isCaffeinated) {
      return;
    }

    console.debug("sleep");

    setSleeping(true);
    callbacks.sleep.forEach((fn) => fn());
    stopTimer();
  }, [callbacks.sleep, stopTimer, isCaffeinated]);

  // Pause the timer and keep the overlay awake
  const caffeinate = useCallback(() => {
    if (isCaffeinated) {
      return;
    }

    console.debug("caffeinate");

    setCaffeinated(true);
    setSleeping(false);
    // callbacks.wake.forEach((fn) => fn(undefined));
    stopTimer();
  }, [stopTimer, isCaffeinated]);

  // Resume the timer
  const uncaffeinate = useCallback(
    (time: number) => {
      if (!isCaffeinated) {
        return;
      }

      console.debug("uncaffeinate");

      setCaffeinated(false);
      startTimer(() => sleep, time);
    },
    [startTimer, isCaffeinated],
  );

  // Expose the full object for sleeping
  const obj = useMemo(
    () => ({
      sleeping,
      wake,
      sleep,
      caffeinate,
      uncaffeinate,
      on,
      off,
    }),
    [sleeping, wake, sleep, on, off],
  );

  return <Context value={obj}>{children}</Context>;
};

const useSleeping = () => {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error("useSleeping must be used within a SleepingProvider");
  return ctx;
};

export default useSleeping;
