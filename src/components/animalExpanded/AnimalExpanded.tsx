import Animal from "../animal/Animal";

import styles from './animalExpanded.module.css';

interface AnimalExpandedProps{
  name: string
  animalType: string
  imgSrc: string
  imgAltText: string

  expandedInfo?: { // extra info displayed when animal is clicked
    scientificName?: string
    sex: string | "unknown"
    age: string | "unknown"
    description?: string
  },
  close: () => void
}
export default function AnimalExpanded(props: AnimalExpandedProps) {
  return (
    <div className={styles.background}>
      <Animal containerClassName={styles.animalExpanded} >
        <div className={styles.close} onClick={props.close}>&times;</div>

        <img className={styles.img} src={props.imgSrc} alt={props.imgAltText} />
        <h2 className={styles.name}>{props.name}</h2>

        <div className={styles.moreInfo}>
          <div className={styles.section}>
            <h3>Species</h3>
            <p>{props.animalType}</p>
            <p>{props.expandedInfo ? props.expandedInfo.scientificName : ""}</p>
          </div>

          <div className={`${styles.section} ${styles.horizontalSection}`}>
            <div>
              <h3>Sex</h3>
              <p>{props.expandedInfo ? props.expandedInfo.sex : "unknown"}</p>
            </div>
            <div>
              <h3>Age</h3>
              <p>{props.expandedInfo ? props.expandedInfo.age : "unknown"}</p>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Description</h3>
            <p>{props.expandedInfo ? props.expandedInfo.description : ""}</p>
          </div>
        </div>
      </Animal>
    </div>
  )
}
