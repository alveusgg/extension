import Animal from "../../../../utils/animal/Animal";
import styles from './animalButton.module.css'

interface AnimalButtonProps{
  img: {
    src: string
    altText: string
  }
  name: string
  species: string

  expand?: (name: string) => void
}
export default function AnimalPreview(props: AnimalButtonProps) {
  function expand(): void {
    if(props.expand){
      props.expand(props.name)
    }
  }
  return (
    <Animal containerClassName={styles.animal} onClick={expand}>
       <img className={styles.img} src={props.img.src} alt={props.img.altText} />
        <h2 className={styles.name}>{props.name}</h2>
        <h3 className={styles.animalType}>{props.species}</h3>
    </Animal>
  )
}
