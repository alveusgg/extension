import DisableChatPopup from "../disableChatPopup/DisableChatPopup"

import styles from "./overlaySettings.module.css"

interface OverlaySettingsProps {
    settings: {
        disableChatPopup: boolean
    }
    toggleDisableChatPopup: () => void
}
export default function OverlaySettings(props: OverlaySettingsProps){
    const toggleDisableChatPopup = () => {
        props.toggleDisableChatPopup()
    }

    return (
        <div className={styles.overlaySettings}>
            <DisableChatPopup
                disableChatPopup={props.settings.disableChatPopup}
                toggleDisableChatPopup={()=>toggleDisableChatPopup()}
            />
        </div>
    )
}