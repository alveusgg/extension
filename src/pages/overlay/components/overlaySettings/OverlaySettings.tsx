import DisableChatPopup from '../disableChatPopup/DisableChatPopup'
import { classes } from '../../../../utils/classes'

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
    <div className={classes(styles.overlaySettings, props.sleeping ? styles.hidden : styles.visible)}>
      <DisableChatPopup
        disableChatPopup={props.settings.disableChatPopup}
        toggleDisableChatPopup={props.toggleDisableChatPopup}
      />
    </div>
  )
}
