import Animal from "../animal/Animal"

import styles from './animalCard.module.css'

export interface AnimalCardProps {
  cardData: {
    img: {
        src: string
        altText: string
    }
    name: string
    species: string
    scientificName: string
    sex?: string
    dateOfBirth: Date
    story: string
    conservationMission: string
  }
  close?: ()=>void
}
export default function AnimalCard(props: AnimalCardProps) {
  return (
      <Animal containerClassName={styles.animalCard} >
        {
            props.close ? <div className={styles.close} onClick={props.close}>&times;</div>
            : null
        }

        <img className={styles.img} src={props.cardData.img.src} alt={props.cardData.img.altText} />
        <h2 className={styles.name}>{props.cardData.name}</h2>

        <div>
          <h3>Species</h3>
          <p>{props.cardData.species}</p>
          <p><i>{props.cardData.scientificName}</i></p>
        </div>

        <div className={styles.compact}>
          <div>
            <h3>Sex</h3>
            <p>{props.cardData.sex}</p>
          </div> 
          <div>
            <h3>Age</h3>
            <p>{props.cardData.dateOfBirth.toUTCString()}</p>
          </div> 
          <div>
            <h3>Birthday</h3>
            <p>{ props.cardData.dateOfBirth.toUTCString() }</p>
          </div> 
        </div>

        <div>
          <h3>IUCN Status</h3>
          <p>Least Concern</p>
        </div>

        <div>
          <h3>Story</h3>
          <p>{props.cardData.story}</p>
        </div> 

        <div>
          <h3>Conservation Mission</h3>
          <p>{props.cardData.conservationMission}</p>
        </div>
      </Animal>
  )
}
