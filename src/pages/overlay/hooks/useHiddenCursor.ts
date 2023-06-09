import { useCallback, useEffect, useRef, useState } from 'react'

const useHiddenCursor = () => {
  // Hide the cursor if the user is inactive on the whole page
  const timer = useRef<NodeJS.Timeout | undefined>(undefined)
  const [hidden, setHidden] = useState(false)

  // Any interaction shows the cursor for 5 seconds
  const show = useCallback(() => {
    setHidden(false)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setHidden(true)
    }, 5000)
  }, [])

  // Show the cursor as soon as the user interacts with the page
  useEffect(() => {
    document.addEventListener('mouseenter', show)
    document.addEventListener('mousemove', show)

    return () => {
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mousemove', show)
    }
  }, [show])

  // Hide the cursor when inactive (not sleeping, as that happens on mouse exit)
  useEffect(() => {
    if (hidden) document.documentElement.style.cursor = 'none'
    else document.documentElement.style.removeProperty('cursor')
  }, [hidden])

  // When we unmount, clear the sleep timer
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  // Expose the state and the active function
  return [hidden, show] as [boolean, () => void]
}

export default useHiddenCursor
