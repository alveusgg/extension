import DisableChatPopup from '../disableChatPopup/DisableChatPopup'

import styles from './overlaySettings.module.css'

interface OverlaySettingsProps {
  sleeping: boolean,
  settings: {
    disableChatPopup: boolean
  }
  toggleDisableChatPopup: () => void
}

export default function OverlaySettings(props: OverlaySettingsProps) {
  return (
    <div className={`${styles.overlaySettings} ${props.sleeping ? styles.hidden : styles.visible}`}>
      <DisableChatPopup
        disableChatPopup={props.settings.disableChatPopup}
        toggleDisableChatPopup={props.toggleDisableChatPopup}
      />
    </div>
  )
}
