import Animal from "../animal/Animal";

import styles from './animalExpanded.module.css';

interface AnimalExpandedProps{
  name: string
  animalType: string
  imgSrc: string
  imgAltText: string

  expandedInfo?: { // extra info displayed when animal is clicked
    scientificName?: string
    sex?: string | "Unknown"
    age?: string | "Unknown"
    arrived?: string | "Unknown"
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
          {props.expandedInfo ?
            <>
            <div className={`${styles.section} ${styles.horizontalSection}`}>
              {props.expandedInfo.sex ?
                <div>
                  <h3>Sex</h3>
                  <p>{props.expandedInfo.sex}</p>
                </div> 
              : null} 
              {props.expandedInfo.age?
                <div>
                  <h3>Age</h3>
                  <p>{props.expandedInfo.age}</p>
                </div> 
              : null} 
              {props.expandedInfo.arrived ?
                <div>
                  <h3>Arrived</h3>
                  <p>{
                    //getting month and year from arrived date
                    [
                      new Date(props.expandedInfo.arrived).toLocaleDateString('default', { month: 'long', timeZone: 'UTC' }),
                      new Date(props.expandedInfo.arrived).getFullYear()
                    ].join(" ")
                  }</p>
                </div> 
              : null} 
            </div>
              {props.expandedInfo.description ?
                <div>
                  <h3>Description</h3>
                  <p>{props.expandedInfo.description}</p>
                </div> 
              : null} 
            </> : null} 
          </div>
      </Animal>
    </div>
  )
}
