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
  wake: ((time: number) => void) | (() => void);
  sleep: () => void;
};

type Event = keyof Events;

export type Sleeping = {
  sleeping: boolean;
  wake: (time: number) => void;
  sleep: () => void;
  stayAwake: () => void;
  resumeTimer: (time: number) => void;
  on: (event: Event, fn: Events[Event]) => void;
  off: (event: Event, fn: Events[Event]) => void;
};

const Context = createContext<Sleeping | undefined>(undefined);

export const SleepingProvider = ({ children }: { children: ReactNode }) => {
  const [startTimer, stopTimer] = useIntelligentTimer();
  const [sleeping, setSleeping] = useState(false);

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
      setSleeping(false);
      callbacks.wake.forEach((fn) => fn(time));
      startTimer(() => setSleeping(true), time);
    },
    [callbacks.wake, startTimer],
  );

  // Immediately sleep the overlay
  const sleep = useCallback(() => {
    setSleeping(true);
    callbacks.sleep.forEach((fn) => fn());
    stopTimer();
  }, [callbacks.sleep, stopTimer]);

  // Pause the timer and keep the overlay awake
  const stayAwake = useCallback(() => {
    setSleeping(false);
    stopTimer();
  }, [stopTimer]);

  // Resume the timer
  const resumeTimer = useCallback(
    (time: number) => {
      startTimer(() => setSleeping(true), time);
    },
    [startTimer],
  );

  // Expose the full object for sleeping
  const obj = useMemo(
    () => ({
      sleeping,
      wake,
      sleep,
      stayAwake,
      resumeTimer,
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
