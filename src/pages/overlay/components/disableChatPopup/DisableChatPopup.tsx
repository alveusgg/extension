// css
import styles from './disableChatPopup.module.css'

interface DisableChatPopupProps {
  disableChatPopup: boolean
  toggleDisableChatPopup: () => void
}

export default function DisableChatPopup(props: DisableChatPopupProps) {
  return (
    <div className={styles.switchContainer}>
      <label>Popups {props.disableChatPopup ? "disabled" : "enabled"}</label>
      <label className={styles.switch}>
        <input type="checkbox" onChange={props.toggleDisableChatPopup} checked={!props.disableChatPopup} />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}
