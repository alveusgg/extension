//css
import styles from './animal.module.css';

interface AnimalProps{
    name: string;
    animalType: string;
    imgSrc: string;
    imgAltText: string;
}
export default function Animal(props: AnimalProps) {
  return (
    <div className={styles.animal}>
        <img src={props.imgSrc} alt={props.imgAltText} />
        <h2>{props.name}</h2>
        <h3>{props.animalType}</h3>
    </div>
  )
}
