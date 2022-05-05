//css
import { useState } from 'react';
import styles from './animal.module.css';

interface AnimalProps{
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
export default function Animal(props: AnimalProps) {
  const [clicked, setClicked] = useState(false);

  function close(): void{
    setClicked(false)
    props.close()
  }
  function expand(): void{
    setClicked(true)
    props.expand(props.name)
  }
  return (
    <div className={!clicked ? styles.animal : `${styles.animal} ${styles.animalExpanded}`} onClick={!clicked ? expand : ()=>{return}}> 
        <div style={!clicked ? {display:"none"} : {}} className={styles.close} onClick={close}>&times;</div>

        <img src={props.imgSrc} alt={props.imgAltText} />
        <h2>{props.name}</h2>
        <h3 className={styles.animalType}>{props.animalType}</h3>

        <div style={!clicked ?{ display:"none"} : {}} className={styles.moreInfo}>
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
  </div>
  )
}
