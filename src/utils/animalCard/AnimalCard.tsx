import Animal from "../animal/Animal"

import styles from './animalCard.module.css'

interface AnimalCardProps {
    img: {
        src: string
        altText: string
    }
    name: string
    species: string
    scientificName: string
    sex?: string
    age?: string
    birthday: string
    iucnStatus: string
    story: string
    conservationMission: string

    close?: ()=>void
}
export default function AnimalCard(props: AnimalCardProps) {
  return (
      <Animal containerClassName={styles.animalCard} >
        {
            props.close ? <div className={styles.close} onClick={props.close}>&times;</div>
            : null
        }

        <img className={styles.img} src={props.img.src} alt={props.img.altText} />
        <h2 className={styles.name}>{props.name}</h2>

        <div>
          <h3>Species</h3>
          <p>{props.species}</p>
          <p><i>{props.scientificName}</i></p>
        </div>

        <div className={styles.compact}>
          <div>
            <h3>Sex</h3>
            <p>{props.sex}</p>
          </div> 
          <div>
            <h3>Age</h3>
            <p>{props.age}</p>
          </div> 
          <div>
            <h3>Birthday</h3>
            <p>{
              //getting month and year from arrived date
              [
                new Date(props.birthday).toLocaleDateString('default', { month: 'long', timeZone: 'UTC' }),
                new Date(props.birthday).getFullYear()
              ].join(" ")
            }</p>
          </div> 
        </div>

        <div>
          <h3>IUCN Status</h3>
          <p>{props.iucnStatus}</p>
        </div>

        <div>
          <h3>Story</h3>
          <p>{props.story}</p>
        </div> 

        <div>
          <h3>Conservation Mission</h3>
          <p>{props.conservationMission}</p>
        </div>
      </Animal>
  )
}
