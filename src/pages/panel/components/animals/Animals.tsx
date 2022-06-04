//components
import AnimalButton from "../animalButton/AnimalButton";
import AnimalCardOverlay from "../animalCardOverlay/AnimalCardOverlay";

//css
import styles from './animals.module.css'
//data
import AnimalsData from "../../../../assets/animals.json"
import { useState } from "react";

export default function Animals() {
  const [animals] = useState(AnimalsData)
  const [expandedAnimal, setExpandedAnimal] = useState("") //name of animal that will show up as a modal

  function handleClose(): void{
    setExpandedAnimal("")
  }
  function handleExpand(name: string): void {
    setExpandedAnimal(name)
  }

  return (
    <main className={styles.animals}>
      {animals && animals.map(animal => (
        <>
          {expandedAnimal === animal.name ? 
            <AnimalCardOverlay
              name={animal.name}
              species={animal.animalType}
              img={{
                src: animal.imgSrc,
                altText: animal.imgAltText
              }}
              scientificName={animal.expandedInfo.scientificName}              
              sex={animal.expandedInfo.sex? animal.expandedInfo.sex : "Unknown"}
              age={animal.expandedInfo.age? animal.expandedInfo.age : "Unknown"}
              birthday={new Date(animal.expandedInfo.arrived)}
              iucnStatus="Least Concern with Decreasing Population Trend"
              story={animal.expandedInfo.description}
              conservationMission={animal.expandedInfo.description}

              close={handleClose}
            />
            : null
          }
          <AnimalButton
            key={animal.name} // every animal will have a unique name
            name={animal.name}
            animalType={animal.animalType}
            img={{
              src: animal.imgSrc,
              altText: animal.imgAltText
            }}

            expand={()=>handleExpand(animal.name)}
          />
        </>
      ))}
    </main>
  )
}
