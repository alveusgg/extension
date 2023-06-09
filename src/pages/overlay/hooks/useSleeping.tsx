import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const events = ['wake', 'sleep'] as const
type Event = typeof events[number]

export type Sleeping = {
  sleeping: boolean,
  wake: (time: number) => void,
  sleep: () => void,
  on: (event: Event, fn: () => void) => void,
  off: (event: Event, fn: () => void) => void,
}

const context = createContext<Sleeping | undefined>(undefined)

export const SleepingProvider = ({ children }: { children: React.ReactNode }) => {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined)
  const [sleeping, setSleeping] = useState(false)

  // Allow subscriptions to wake/sleep events
  // This allows logic to know when the overlay was re-awoken, even if it was already awake
  const [callbacks, setCallbacks] = useState<{ [k in Event]: (() => void)[] }>(events.reduce((prev, event) => ({ ...prev, [event]: [] }), {} as any))
  const on = useCallback<Sleeping['on']>((event, fn) => {
    setCallbacks(prev => ({ ...prev, [event]: [...prev[event], fn] }))
  }, [])
  const off = useCallback<Sleeping['off']>((event, fn) => {
    setCallbacks(prev => ({ ...prev, [event]: prev[event].filter(f => f !== fn) }))
  }, [])

  // Wake the overlay for x milliseconds
  const wake = useCallback((time: number) => {
    setSleeping(false)
    callbacks.wake.forEach(fn => fn())
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setSleeping(true)
    }, time)
  }, [callbacks.wake])

  // Immediately sleep the overlay
  const sleep = useCallback(() => {
    setSleeping(true)
    callbacks.sleep.forEach(fn => fn())
    if (timer.current) clearTimeout(timer.current)
  }, [callbacks.sleep])

  // When we unmount, clear the sleep timer
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  // Expose the full object for sleeping
  const obj = useMemo(() => ({
    sleeping,
    wake,
    sleep,
    on,
    off,
  }), [sleeping, wake, sleep, on, off])

  return <context.Provider value={obj}>{children}</context.Provider>
}

const useSleeping = () => {
  const ctx = useContext(context)
  if (!ctx) throw new Error("useSleeping must be used within a SleepingProvider")
  return ctx
}

export default useSleeping
