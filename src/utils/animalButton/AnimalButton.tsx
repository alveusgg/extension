import Animal from "../animal/Animal";
import styles from './animalButton.module.css'

interface AnimalButtonProps{
  img: {
    src: string
    altText: string
  }
  name: string
  species: string

  getCard?: (name: string) => void
}
export default function AnimalPreview(props: AnimalButtonProps) {
  function getCard(): void {
    if(props.getCard){
      props.getCard(props.name)
    }
  }
  return (
    <Animal containerClassName={styles.animal} onClick={getCard}>
       <img className={styles.img} src={props.img.src} alt={props.img.altText} />
        <h2 className={styles.name}>{props.name}</h2>
        <h3 className={styles.animalType}>{props.species}</h3>
    </Animal>
  )
}
