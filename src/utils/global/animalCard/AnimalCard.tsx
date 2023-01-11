import Animal from "../../compositions/animal/Animal"
import {calculateAge, formatDate, isBirthday} from "../../dateManager"

import styles from './animalCard.module.css'

export interface AnimalCardProps {
  cardData: {
    name: string
    species: string
    img: {
        src: string
        altText: string
    }
    scientificName: string
    sex?: string
    dateOfBirth: string 
    iucnStatus: string
    story: string
    conservationMission: string
  }
  close?: ()=>void
  containerClassName?: string
}
export default function AnimalCard(props: AnimalCardProps) {
  return (
      <Animal containerClassName={`${styles.animalCard} ${props.containerClassName} ${isBirthday(props.cardData.dateOfBirth) === true ? styles.birthday : ""}`} >
        {
            props.close ? <div className={styles.close} onClick={props.close}>&times;</div>
            : null
        }

        <h2 className={styles.name}>{props.cardData.name}</h2>
        <img className={styles.img} src={props.cardData.img.src} alt={props.cardData.img.altText} />

        <div className={styles.row}>
          <h3>Species</h3>
          <p>{props.cardData.species}</p>
          <p><i>{props.cardData.scientificName}</i></p>
        </div>

        <div className={`${styles.row} ${styles.compact}`}>
          <div>
            <h3>Sex</h3>
            <p>{props.cardData.sex}</p>
          </div> 
          <div>
            <h3>Age</h3>
            <p>{
                props.cardData.dateOfBirth !== "" ? calculateAge(props.cardData.dateOfBirth) : "Unknown"
            }</p>
          </div> 
          <div>
            <h3>Birthday</h3>
            <p>{
                props.cardData.dateOfBirth !== "" ? formatDate(props.cardData.dateOfBirth) : "Unknown"
            }</p>
          </div> 
        </div>

        <div className={styles.row}>
          <h3>IUCN Status</h3>
          <p>{props.cardData.iucnStatus}</p>
        </div>

        <div className={`${styles.row} ${styles.story}`}>
          <h3>Story</h3>
          <p>{props.cardData.story}</p>
        </div> 

        <div className={`${styles.row} ${styles.conservationMission}`}>
          <h3>Conservation Mission</h3>
          <p>{props.cardData.conservationMission}</p>
        </div>
      </Animal>
  )
}
