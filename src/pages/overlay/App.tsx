// utils
import { useState, useEffect, useCallback, useRef, useMemo } from "react"

// components
import Overlay from "./components/overlay/Overlay"
import OverlaySettings from "./components/overlaySettings/OverlaySettings"

// css
import styles from "./App.module.css"

export default function App(){
    const [overlaySettings, setOverlaySettings] = useState(() => {
        // Load settings from local storage, merging with defaults
        const settings = JSON.parse(localStorage.getItem("settings") || "{}")
        return {
            disableChatPopup: false,
            ...settings
        }
    })

    useEffect(() => {
        // save settings to local storage
        localStorage.setItem("settings", JSON.stringify(overlaySettings))
    }, [overlaySettings])

    const toggleDisableChatPopup = useCallback(() => {
        setOverlaySettings(current => ({
            ...current,
            disableChatPopup: !current.disableChatPopup
        }))
    }, [])

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
    }, [wake])

    // Bind a capturing event listener for scrolling (so we can see scrolling for children)
    useEffect(() => {
        appRef.current?.addEventListener("scroll", interacted, true)
        return () => appRef.current?.removeEventListener("scroll", interacted, true)
    }, [interacted])

    // Immediately sleep the overlay
    const sleep = useCallback(() => {
        setSleeping(true)
        if (sleepTimer.current) clearTimeout(sleepTimer.current)
    }, [])

    // When we unmount, clear the sleep timer
    useEffect(() => () => {
        if (sleepTimer.current) clearTimeout(sleepTimer.current)
    }, [])

    return (
        <div
            ref={appRef}
            className={`${styles.app} ${sleeping ? styles.hidden : styles.visible}`}
            onMouseEnter={interacted}
            onMouseMove={interacted}
            onMouseLeave={sleep}
        >
            <Overlay
                sleeping={sleeping}
                awoken={awokenObj}
                wake={wake}
                settings={{
                    disableChatPopup: overlaySettings.disableChatPopup
                }}
            />
            <OverlaySettings
                sleeping={sleeping}
                settings={{
                    disableChatPopup: overlaySettings.disableChatPopup
                }}
                toggleDisableChatPopup={toggleDisableChatPopup}
            />
        </div>
    )
}
