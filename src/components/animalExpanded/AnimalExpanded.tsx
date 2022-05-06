import Animal from "../animal/Animal";
import AnimalPreview from "../animalPreview/AnimalPreview";

import styles from './animalExpanded.module.css';

interface AnimalExpanded{
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

  expand: (id: string) => void
  close: () => void
}
export default function AnimalExpanded(props: AnimalExpanded) {
  return (
    <Animal>
      <div onClick={close}>&times;</div>

      <AnimalPreview
        name={props.name}
        animalType={props.animalType} 
        imgSrc={props.imgSrc}
        imgAltText={props.imgAltText}

        expand={props.expand}
      />

      <div>
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
  )
}
