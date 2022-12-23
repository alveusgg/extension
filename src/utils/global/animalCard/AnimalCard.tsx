import Animal from "../../compositions/animal/Animal"

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
    dateOfBirth: Date
    iucnStatus: string
    story: string
    conservationMission: string
  }
  close?: ()=>void
  containerClassName?: string
}
export default function AnimalCard(props: AnimalCardProps) {

  function calculateAge(birthday: Date): string { // birthday is a date
      let  measurement = 'year'
      let ageDifMs = Date.now() - birthday.getTime()
      let ageDate = new Date(ageDifMs) // miliseconds from epoch
      
      let age = ageDate.getUTCFullYear() - 1970
      if(age < 1){
        age = ageDate.getUTCMonth()
        measurement = 'month'
      }
      if(age < 1){
        age = ageDate.getUTCDate()
        measurement = 'day'
      }

      if(age > 1)
        measurement += 's'

      return age.toString() + ' ' + measurement;
  }

  return (
      <Animal containerClassName={`${styles.animalCard} ${props.containerClassName}`} >
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
              props.cardData.dateOfBirth instanceof Date && !isNaN(Number(props.cardData.dateOfBirth)) ? //checking if dateOfBirth is set
                calculateAge( new Date(
                  props.cardData.dateOfBirth.getFullYear(), 
                  props.cardData.dateOfBirth.getUTCMonth(), 
                  props.cardData.dateOfBirth.getUTCDate()
                ))
                : "Unknown"
            }</p>
          </div> 
          <div>
            <h3>Birthday</h3>
            <p>{
              props.cardData.dateOfBirth instanceof Date && !isNaN(Number(props.cardData.dateOfBirth)) ? //checking if dateOfBirth is set
                new Date(
                  props.cardData.dateOfBirth.getFullYear(), 
                  props.cardData.dateOfBirth.getUTCMonth(), 
                  props.cardData.dateOfBirth.getUTCDate()
                ).toDateString()
              : "Unknown"
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
