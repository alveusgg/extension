import Ambassador from "../../compositions/ambassador/Ambassador";
import styles from './ambassadorButton.module.css'

interface AmbassadorButtonProps{
  img: {
    src: string
    altText: string
  }
  name: string
  species: string

  getCard?: (name: string) => void
  changeEditMode?: () => void

  ClassName?: string
  Id?: string
}
export default function AmbassadorButton(props: AmbassadorButtonProps) {
  function handleClick(): void {
    if(props.getCard)
      props.getCard(props.name)

    if(props.changeEditMode)
      props.changeEditMode()
  }
  return (
    <Ambassador ClassName={`${styles.ambassador}  ${props.ClassName}`} Id={props.Id} onClick={handleClick}>
       <img className={styles.img} src={props.img.src} alt={props.img.altText} />
        <h2 className={styles.name}>{props.name}</h2>
        <h3 className={styles.species}>{props.species}</h3>
    </Ambassador>
  )
}
