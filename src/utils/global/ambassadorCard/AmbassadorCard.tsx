import { useState } from "react"
import Ambassador from "../../compositions/ambassador/Ambassador"
import {calculateAge, formatDate, isBirthday} from "../../dateManager"

import styles from './ambassadorCard.module.css'

export interface AmbassadorCardProps {
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

    helpSpecies?: { //shown in back of card
      help: string
      img?: {
        src: string
        altText: string
      }[]
      link?: {
        href: string
        text: string
      }
      explanation: string
      note?: string
    }[]
  }

  close?: ()=>void
  ClassName?: string
}

export default function AmbassadorCard(props: AmbassadorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={`${styles.ambassador} ${props.ClassName}`}>
      <Ambassador ClassName={`${styles.ambassadorCard} ${isFlipped ? styles.flipCard : null} ${isBirthday(props.cardData.dateOfBirth) === true ? styles.birthday : ""}`}>
        <div className={styles.front}>
          {props.close ? (
            <div className={styles.close} onClick={props.close}>&times;</div>
          ) : null}

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
              <p>
                {props.cardData.dateOfBirth !== "" ? calculateAge(props.cardData.dateOfBirth) : "Unknown"}
              </p>
            </div>
            <div>
              <h3>Birthday</h3>
              <p>
                {props.cardData.dateOfBirth !== "" ? formatDate(props.cardData.dateOfBirth) : "Unknown"}
              </p>
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
        </div>
        <div className={styles.back}>
            {props.close ? (
              <div className={styles.close} onClick={props.close}>&times;</div>
            ) : null}

            <h2>Help {props.cardData.name.split(" ")[0]}'s Species</h2>
            <ul>
              {props.cardData.helpSpecies?.map((helpItem, index) => {
                return (
                  <div key={index}>
                    <h3>{helpItem.help}</h3>

                    {helpItem.img?.map((img, index) => {
                      return (
                        <img key={index} src={img.src} alt={img.altText} />
                      )
                    })}

                    {helpItem.link ? <a href={helpItem.link.href}>{helpItem.link.text}</a> : null}

                    <li>{helpItem.explanation}</li>

                    {helpItem.note ? <li>{helpItem.note}</li> : null}
                  </div>
                )
              })}
            </ul>
        </div>
      </Ambassador>
      <button onClick={()=>setIsFlipped(!isFlipped)}>{!isFlipped ? "Help "+ props.cardData.name.split(" ")[0] + "'s Species" : "About "+props.cardData.name.split(" ")[0]}</button>
    </div>
  )
}
