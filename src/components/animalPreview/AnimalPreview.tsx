import Animal from "../animal/Animal";
import styles from './animalPreview.module.css'

interface AnimalPreviewProps{
  name: string
  animalType: string
  imgSrc: string
  imgAltText: string

  expand: (name: string) => void
}
export default function AnimalPreview(props: AnimalPreviewProps) {
  function expand(): void {
    props.expand(props.name)
  }
  return (
    <Animal containerClassName={styles.animal} onClick={expand}>
       <img className={styles.img} src={props.imgSrc} alt={props.imgAltText} />
        <h2 className={styles.name}>{props.name}</h2>
        <h3 className={styles.animalType}>{props.animalType}</h3>
    </Animal>
  )
}
