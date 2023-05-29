import { typeSafeObjectEntries } from '../../../../../utils/helpers'
import Card from '../../card/Card'
import Toggle from '../../toggle/Toggle'
import type { OverlayOptionProps } from '../Overlay'

import styles from './settings.module.scss'

export default function Settings(props: OverlayOptionProps) {
  const { context, className } = props

  return (
    <Card className={className} title="Extension Settings">
      <ul className={styles.settings}>
        {typeSafeObjectEntries(context.settings).map(([key, setting]) => (
          <li key={key}>
            {setting.type === 'boolean' && (
              <Toggle label={setting.title} value={setting.value} onChange={setting.change} />
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
