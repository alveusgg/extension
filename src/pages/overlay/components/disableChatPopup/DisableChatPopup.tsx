// css
import styles from './disableChatPopup.module.css'

interface DisableChatPopupProps {
    disableChatPopup: boolean
    toggleDisableChatPopup: () => void
}
export default function DisableChatPopup(props: DisableChatPopupProps){
    const toggleDisableChatPopup = () => {
        props.toggleDisableChatPopup()
    }

    return (
        <div className={styles.switchContainer}>
            <label>{props.disableChatPopup ? "Enable" : "Disable"} Popups</label>
            <label className={styles.switch}>
                <input type="checkbox" onClick={()=>toggleDisableChatPopup()} defaultChecked={props.disableChatPopup} />
                <span className={`${styles.slider} ${styles.round}`} ></span>
            </label>
        </div>
    )
}