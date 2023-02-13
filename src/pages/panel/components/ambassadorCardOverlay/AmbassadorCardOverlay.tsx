import AmbassadorCard from "../../../../utils/global/ambassadorCard/AmbassadorCard";

import styles from './ambassadorCardOverlay.module.css';

import { AmbassadorCardProps } from "../../../../utils/global/ambassadorCard/AmbassadorCard";
interface AmbassadorCardOverlayProps{
  ambassadorCard: AmbassadorCardProps
  close: () => void
}

export default function AmbassadorCardOverlay(props: AmbassadorCardOverlayProps) {
  return (
    <div className={styles.background}>
      <AmbassadorCard
        cardFrontData={ props.ambassadorCard.cardFrontData }
        cardBackData={ props.ambassadorCard.cardBackData }
        close={props.close}
        ClassName={styles.ambassadorCard}
      />
    </div>
  )
}
