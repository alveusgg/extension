// utils
import { useState, useEffect} from "react"

// components
import Overlay from "./components/overlay/Overlay"
import OverlaySettings from "./components/overlaySettings/OverlaySettings"

// css
import "./App.css"
export default function App(){
    const [overlaySettings, setOverlaySettings] = useState({
        disableChatPopup: false
    })

    useEffect(() => {
        //load from local storage 
        console.log(overlaySettings)
    }, [overlaySettings])

    const toggleDisableChatPopup = () => {
        setOverlaySettings({
            ...overlaySettings,
            disableChatPopup: !overlaySettings.disableChatPopup
        })
        
        //save to local storage
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