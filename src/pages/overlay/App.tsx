import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

import { classes } from '../../utils/classes'
import useHiddenCursor from './hooks/useHiddenCursor'
import useStoredSettings from './hooks/useStoredSettings'

import Overlay from './components/overlay/Overlay'
import styles from './App.module.scss'

export default function App() {
  // Hide the cursor when the user is idle
  const [, showCursor] = useHiddenCursor()

  // Show/hide the overlay based on mouse movement
  const appRef = useRef<HTMLDivElement>(null)
  const sleepTimer = useRef<NodeJS.Timeout | undefined>(undefined)
  const [sleeping, setSleeping] = useState(false)

  // Allow children to know when we have been woken up
  const [awoken, setAwoken] = useState<(() => void)[]>([])
  const addAwoken = useCallback((callback: () => void) => {
    setAwoken(current => [...current, callback])
  }, [])
  const removeAwoken = useCallback((callback: () => void) => {
    setAwoken(current => current.filter(c => c !== callback))
  }, [])
  const awokenObj = useMemo(() => ({ add: addAwoken, remove: removeAwoken }), [addAwoken, removeAwoken])

  // Wake the overlay for x milliseconds
  const wake = useCallback((time: number) => {
    setSleeping(false)
    awoken.forEach(fn => fn())
    if (sleepTimer.current) clearTimeout(sleepTimer.current)
    sleepTimer.current = setTimeout(() => {
      setSleeping(true)
    }, time)
  }, [awoken])

  // When the user interacts, have a 5s timeout before hiding the overlay
  const interacted = useCallback(() => {
    wake(5000)
    showCursor()
  }, [wake, showCursor])

  // When a user scrolls, treat it as an interaction (but handle Firefox being weird)
  const scrollRef = useRef<[HTMLElement, number]|undefined>(undefined)
  const scrolled = useCallback((e: Event) => {
    const target = e.target as HTMLElement

    // If the scroll event is from the same element, and the scroll position is the same, ignore it
    // This fixes a bug in Firefox where animating translate emits scroll events
    if (scrollRef.current) {
      const [node, scrollTop] = scrollRef.current
      if (node === target && scrollTop === target.scrollTop) return
    }

    scrollRef.current = [target, target.scrollTop]
    interacted()
  }, [interacted])

  // Bind a capturing event listener for scrolling (so we can see scrolling for children)
  useEffect(() => {
    if (!appRef.current) return
    const node = appRef.current
    node.addEventListener("scroll", scrolled, true)
    return () => node.removeEventListener("scroll", scrolled, true)
  }, [scrolled])

  // Immediately sleep the overlay
  const sleep = useCallback(() => {
    setSleeping(true)
    if (sleepTimer.current) clearTimeout(sleepTimer.current)
  }, [])

  // When we unmount, clear the sleep timer
  useEffect(() => () => {
    if (sleepTimer.current) clearTimeout(sleepTimer.current)
  }, [])

  // Block sleeping hiding the overlay if dev toggle is on
  const settings = useStoredSettings()
  let visibilityClass = sleeping ? styles.hidden : styles.visible
  if (process.env.NODE_ENV === 'development' && settings.disableOverlayHiding.value)
    visibilityClass = styles.visible

  return (
    <div
      ref={appRef}
      className={classes(styles.app, visibilityClass)}
      onMouseEnter={interacted}
      onMouseMove={interacted}
      onMouseLeave={sleep}
    >
      <Overlay
        sleeping={sleeping}
        awoken={awokenObj}
        wake={wake}
      />
    </div>
  )
}
