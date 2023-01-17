//utils
import { useEffect, useState } from "react"

//components
import DisableChatPopup from "../disableChatPopup/DisableChatPopup"

//css
import styles from "./overlaySettings.module.css"

interface OverlaySettingsProps {
    settings: {
        disableChatPopup: boolean
    }
    toggleDisableChatPopup: () => void
}
export default function OverlaySettings(props: OverlaySettingsProps){
    const [isOverlaySettingsVisible, setIsOverlaySettingsVisible] = useState(false)

    useEffect(() => {
        initMouseEventListener()
    }, [])

    const toggleDisableChatPopup = () => {
        props.toggleDisableChatPopup()
    }

    // create mouse event listener to show/hide overlay if mouse is in the viewport
    const initMouseEventListener = () => {
        let body = document.querySelector("body")
        //check if mouse is in the viewport
        if(body !== null){
            body.addEventListener('mouseleave', () => {
                setIsOverlaySettingsVisible(false)
            })
        }
        if(body !== null){
            body.addEventListener('mouseenter', () => {
                setIsOverlaySettingsVisible(true)
            })
        }
    }
    return (
        <div className={`${styles.overlaySettings} ${isOverlaySettingsVisible ? styles.visible : styles.hidden}`}>
            <DisableChatPopup
                disableChatPopup={props.settings.disableChatPopup}
                toggleDisableChatPopup={()=>toggleDisableChatPopup()}
            />
        </div>
    )
}