import AnimalCard from "../../../../utils/global/animalCard/AnimalCard";

import styles from './animalCardOverlay.module.css';

import { AnimalCardProps } from "../../../../utils/global/animalCard/AnimalCard";
interface AnimalCardOverlayProps{
  animalCard: AnimalCardProps
  close: () => void
}
export default function AnimalCardOverlay(props: AnimalCardOverlayProps) {
  return (
    <div className={styles.background}>
      <AnimalCard
        cardData={ props.animalCard.cardData }
        close={props.close} 
        ClassName={styles.animalCard}
      />
    </div>
  )
}
