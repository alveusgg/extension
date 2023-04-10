import { type Ambassador as AmbassadorType, type AmbassadorKey } from '@alveusgg/data/src/ambassadors/core'
import { getAmbassadorImages } from '@alveusgg/data/src/ambassadors/images'
import { getIUCNStatus } from '@alveusgg/data/src/iucn'

import Ambassador from '../../compositions/ambassador/Ambassador'
import { calculateAge, formatDate, isBirthday } from '../../dateManager'
import { getAmbassadorImagePosition } from '../../ambassdaors'

import styles from './ambassadorCard.module.css'

export interface AmbassadorCardProps {
  ambassadorKey: AmbassadorKey
  ambassador: AmbassadorType
  close?: () => void
  ClassName?: string
}

export default function AmbassadorCard(props: AmbassadorCardProps) {
  const { ambassadorKey, ambassador, close, ClassName } = props
  const images = getAmbassadorImages(ambassadorKey)

  return (
    <Ambassador ClassName={`${styles.ambassadorCard} ${ClassName} ${ambassador.birth && isBirthday(ambassador.birth) ? styles.birthday : ""}`}>
      {props.close && (
        <div className={styles.close} onClick={close}>&times;</div>
      )}

      <h2 className={styles.name}>{ambassador.name}</h2>
      <img
        className={styles.img}
        src={images[0].src}
        alt={images[0].alt}
        style={{ objectPosition: getAmbassadorImagePosition(ambassadorKey) }}
      />

      <div className={styles.row}>
        <h3>Species</h3>
        <p>{ambassador.species}</p>
        <p><i>{ambassador.scientific}</i></p>
      </div>

      <div className={`${styles.row} ${styles.compact}`}>
        <div>
          <h3>Sex</h3>
          <p>{ambassador.sex || "Unknown"}</p>
        </div>
        <div>
          <h3>Age</h3>
          <p>
            {ambassador.birth ? calculateAge(ambassador.birth) : "Unknown"}
          </p>
        </div>
        <div>
          <h3>Birthday</h3>
          <p>
            {ambassador.birth ? formatDate(ambassador.birth) : "Unknown"}
          </p>
        </div>
      </div>

      <div className={styles.row}>
        <h3>IUCN Status</h3>
        <p>{getIUCNStatus(ambassador.iucn.status)}</p>
      </div>

      <div className={`${styles.row} ${styles.story}`}>
        <h3>Story</h3>
        <p>{ambassador.story}</p>
      </div>

      <div className={`${styles.row} ${styles.conservationMission}`}>
        <h3>Conservation Mission</h3>
        <p>{ambassador.mission}</p>
      </div>
    </Ambassador>
  )
}
