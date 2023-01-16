// utils
import { useState } from 'react'

// css
import styles from './disableChatPopup.module.css'

export default function DisableChatPopup(){
    const [isSwitchFlipped, setIsSwitchFlipped] = useState(false)
    return (
        <div className={styles.switchContainer}>
            <label>{isSwitchFlipped ? "Enable" : "Disable"} Popups</label>
            <label className={styles.switch}>
                <input type="checkbox"/>
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    )
}