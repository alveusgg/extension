import Animal from "../animal/Animal";
import styles from './animalPreview.module.css'

interface AnimalPreview{
  name: string
  animalType: string
  imgSrc: string
  imgAltText: string

  expand: (name: string) => void
}
export default function AnimalPreview(props: AnimalPreview) {
  return (
    <Animal>
       <img className={styles.img} src={props.imgSrc} alt={props.imgAltText} />
        <h2 className={styles.name}>{props.name}</h2>
        <h3 className={styles.animalType}>{props.animalType}</h3>
    </Animal>
  )
}
