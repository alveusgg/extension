import AnimalCard from "../../../../utils/animalCard/AnimalCard";

import styles from './animalCardOverlay.module.css';

interface AnimalCardOverlayProps{
  img: {
    src: string
    altText: string
  }
  name: string
  scientificName: string
  species: string
  sex: string | "Unknown"
  age: string | "Unknown"
  arrived: string | "Unknown"
  story: string
  conservationMission: string

  close: () => void
}
export default function AnimalCardOverlay(props: AnimalCardOverlayProps) {
  return (
    <div className={styles.background}>
      <AnimalCard
        name={props.name}
        species={props.species}
        img={props.img}
        scientificName={props.scientificName}
        sex={props.sex}
        age={props.age}
        arrived={props.arrived}
        story={props.story}
        conservationMission={props.conservationMission}

        close={props.close} 
      />
    </div>
  )
}
