import { classes } from '../../../../../utils/classes'
import { typeSafeObjectEntries } from '../../../../../utils/helpers'
import Toggle from '../../toggle/Toggle'
import type { OverlayOptionProps } from '../Overlay'

import styles from './settings.module.css'

export default function Settings(props: OverlayOptionProps) {
  const { context, className } = props

  return (
    <div className={classes(styles.settings, className)}>
      <ul>
        {typeSafeObjectEntries(context.settings).map(([key, setting]) => (
          <li key={key}>
            {setting.type === 'boolean' && (
              <Toggle label={setting.title} value={setting.value} onChange={setting.change} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
