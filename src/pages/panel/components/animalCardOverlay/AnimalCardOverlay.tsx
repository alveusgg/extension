import AnimalCard from "../../../../utils/animalCard/AnimalCard";

import styles from './animalCardOverlay.module.css';

import { AnimalCardProps } from "../../../../utils/animalCard/AnimalCard";
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
      />
    </div>
  )
}
