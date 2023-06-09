import { useEffect, useCallback, useRef } from 'react'

import { classes } from '../../utils/classes'
import useHiddenCursor from './hooks/useHiddenCursor'
import useSettings from './hooks/useSettings'
import useSleeping from './hooks/useSleeping'

import Overlay from './components/overlay/Overlay'
import styles from './App.module.scss'

// Hide the overlay after 5s of inactivity
const timeout = 5_000;

export default function App() {
  // Show/hide the overlay based on mouse movement
  const { sleeping, wake, sleep, on: addSleepListener, off: removeSleepListener } = useSleeping();
  const appRef = useRef<HTMLDivElement>(null)

  // When the user interacts, show the overlay
  const interacted = useCallback(() => wake(timeout), [wake])

  // Hide the cursor when the user is idle
  const [, showCursor] = useHiddenCursor()

  // When the overlay is awoken, show the cursor
  useEffect(() => {
    addSleepListener('wake', showCursor)
    return () => removeSleepListener('wake', showCursor)
  }, [addSleepListener, removeSleepListener, showCursor])

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

  // Block sleeping hiding the overlay if dev toggle is on
  const settings = useSettings()
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
      <Overlay />
    </div>
  )
}
