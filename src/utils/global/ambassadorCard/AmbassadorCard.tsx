import { useState } from "react"
import Ambassador from "../../compositions/ambassador/Ambassador"
import {calculateAge, formatDate, isBirthday} from "../../dateManager"

import styles from './ambassadorCard.module.css'

export interface AmbassadorCardProps {
  cardFrontData: {
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
  cardBackData: {
    helpSpecies: string[]
  }
  close?: ()=>void
  ClassName?: string
}

export default function AmbassadorCard(props: AmbassadorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`${styles.ambassador} ${props.ClassName}`}>
      <Ambassador ClassName={`${styles.ambassadorCard} ${isFlipped ? styles.flipCard : null} ${isBirthday(props.cardFrontData.dateOfBirth) === true ? styles.birthday : ""}`}>
        <div className={styles.front}>
          {props.close ? (
            <div className={styles.close} onClick={props.close}>&times;</div>
          ) : null}

          <h2 className={styles.name}>{props.cardFrontData.name}</h2>
          <img className={styles.img} src={props.cardFrontData.img.src} alt={props.cardFrontData.img.altText} />

          <div className={styles.row}>
            <h3>Species</h3>
            <p>{props.cardFrontData.species}</p>
            <p><i>{props.cardFrontData.scientificName}</i></p>
          </div>

          <div className={`${styles.row} ${styles.compact}`}>
            <div>
              <h3>Sex</h3>
              <p>{props.cardFrontData.sex}</p>
            </div>
            <div>
              <h3>Age</h3>
              <p>
                {props.cardFrontData.dateOfBirth !== "" ? calculateAge(props.cardFrontData.dateOfBirth) : "Unknown"}
              </p>
            </div>
            <div>
              <h3>Birthday</h3>
              <p>
                {props.cardFrontData.dateOfBirth !== "" ? formatDate(props.cardFrontData.dateOfBirth) : "Unknown"}
              </p>
            </div>
          </div>

          <div className={styles.row}>
            <h3>IUCN Status</h3>
            <p>{props.cardFrontData.iucnStatus}</p>
          </div>

          <div className={`${styles.row} ${styles.story}`}>
            <h3>Story</h3>
            <p>{props.cardFrontData.story}</p>
          </div>

          <div className={`${styles.row} ${styles.conservationMission}`}>
            <h3>Conservation Mission</h3>
            <p>{props.cardFrontData.conservationMission}</p>
          </div>
        </div>
        <div className={styles.back}>
            {props.close ? (
              <div className={styles.close} onClick={props.close}>&times;</div>
            ) : null}

            <h2>Help {props.cardFrontData.name.split(" ")[0]}'s Species</h2>
            <ul>
              {props.cardBackData.helpSpecies.map((helpItem, index) => {
                return <li key={index}>{helpItem}</li>
              })}
            </ul>
        </div>
      </Ambassador>
      <button onClick={()=>setIsFlipped(!isFlipped)}>{!isFlipped ? "Help "+ props.cardFrontData.name.split(" ")[0] + "'s Species" : "About "+props.cardFrontData.name.split(" ")[0]}</button>
    </div>
  )
}
