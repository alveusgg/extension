// utils
import { useState, useEffect, useCallback, useRef } from "react"

// components
import Overlay from "./components/overlay/Overlay"
import OverlaySettings from "./components/overlaySettings/OverlaySettings"

// css
import styles from "./App.module.css"

export default function App(){
    const [overlaySettings, setOverlaySettings] = useState({
        disableChatPopup: false,
    })

    useEffect(() => {
        //load settings from local storage
        setOverlaySettings(JSON.parse(localStorage.getItem("settings") || "{}"))
    }, [])
    useEffect(() => {
        //save settings to local storage
        localStorage.setItem("settings", JSON.stringify(overlaySettings))
    }, [overlaySettings])

    const toggleDisableChatPopup = useCallback(() => {
        setOverlaySettings(current => ({
            ...current,
            disableChatPopup: !current.disableChatPopup
        }))
    }, [])

    // Show/hide the overlay based on mouse movement
    const sleepTimer = useRef<NodeJS.Timeout | undefined>(undefined)
    const [sleeping, setSleeping] = useState(false)
    const wake = useCallback((time: number) => {
        setSleeping(false)
        if (sleepTimer.current) clearTimeout(sleepTimer.current)
        sleepTimer.current = setTimeout(() => {
            setSleeping(true)
        }, time)
    }, [])
    const sleep = useCallback(() => {
        setSleeping(true)
        if (sleepTimer.current) clearTimeout(sleepTimer.current)
    }, [])
    useEffect(() => () => {
        if (sleepTimer.current) clearTimeout(sleepTimer.current)
    }, [])

    return (
        <div
            className={`${styles.app} ${sleeping ? styles.hidden : styles.visible}`}
            onMouseEnter={() => wake(5000)}
            onMouseMove={() => wake(5000)}
            onMouseLeave={sleep}
        >
            <Overlay
                sleeping={sleeping}
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
