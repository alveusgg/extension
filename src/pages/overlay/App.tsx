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

    // Hide the overlay after 5s of no mouse movement
    const inactiveTimer = useRef<NodeJS.Timeout | undefined>(undefined)
    const [inactive, setInactive] = useState(false)
    const onMouseMove = useCallback(() => {
        setInactive(false)
        if (inactiveTimer.current) clearTimeout(inactiveTimer.current)
        inactiveTimer.current = setTimeout(() => {
            setInactive(true)
        }, 5000)
    }, [])
    useEffect(() => () => {
        if (inactiveTimer.current) clearTimeout(inactiveTimer.current)
    }, [])

    return (
        <div className={`${styles.app} ${inactive ? styles.hidden : styles.visible}`} onMouseMove={onMouseMove}>
            <Overlay
                settings={{
                    disableChatPopup: overlaySettings.disableChatPopup
                }}
            />
            <OverlaySettings
                settings={{
                    disableChatPopup: overlaySettings.disableChatPopup
                }}
                toggleDisableChatPopup={toggleDisableChatPopup}
            />
        </div>
    )
}
