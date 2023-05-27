import AmbassadorCard, { type AmbassadorCardProps } from '../../../../utils/global/ambassadorCard/AmbassadorCard';

import styles from './ambassadorCardOverlay.module.css';

interface AmbassadorCardOverlayProps{
  ambassadorCard: AmbassadorCardProps
  onClose: () => void
}

export default function AmbassadorCardOverlay(props: AmbassadorCardOverlayProps) {
  return (
    <div className={styles.background}>
      <AmbassadorCard
        {...props.ambassadorCard}
        onClose={props.onClose}
        className={styles.ambassadorCard}
      />
    </div>
  )
}
