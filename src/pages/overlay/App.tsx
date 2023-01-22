// utils
import { useState, useEffect} from "react"

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

    const toggleDisableChatPopup = () => {
        setOverlaySettings({
            ...overlaySettings,
            disableChatPopup: !overlaySettings.disableChatPopup
        })
    }

    return (
        <div className={styles.app}>
            <Overlay
                settings={{
                    disableChatPopup: overlaySettings.disableChatPopup
                }}
            />
            <OverlaySettings
                settings={{
                    disableChatPopup: overlaySettings.disableChatPopup
                }}
                toggleDisableChatPopup={()=>toggleDisableChatPopup()}
            />
        </div>
    )
}
