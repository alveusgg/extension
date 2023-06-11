import { useCallback, useEffect, useRef } from 'react'

const useIntelligentTimer = () => {
  const current = useRef<NodeJS.Timeout | undefined>(undefined)
  const end = useRef<number | undefined>(undefined)

  const start = useCallback((callback: () => void, time: number) => {
    // If the requested time is less than the current time, do nothing
    const newEnd = Date.now() + time
    if (end.current && newEnd < end.current) return

    // If there's a timer, clear it
    if (current.current) clearTimeout(current.current)

    // Start the new timer
    end.current = newEnd
    current.current = setTimeout(() => {
      callback()
      end.current = undefined
    }, time)
  }, [])

  const stop = useCallback(() => {
    if (current.current) clearTimeout(current.current)
    end.current = undefined
  }, [])

  useEffect(() => () => {
    if (current.current) clearTimeout(current.current)
  }, [])

  return [start, stop] as [typeof start, typeof stop]
}

export default useIntelligentTimer
