// utils
import { useState, useEffect} from "react"

// components
import Overlay from "./components/overlay/Overlay"
import OverlaySettings from "./components/overlaySettings/OverlaySettings"

// css
import "./App.css"
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

    const toggleDisableChatPopup = () => {
        setOverlaySettings({
            ...overlaySettings,
            disableChatPopup: !overlaySettings.disableChatPopup
        })
    }

    return (
        <div className="App">
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