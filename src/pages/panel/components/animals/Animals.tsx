//components
import AnimalButton from "../../../../utils/animalButton/AnimalButton";
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
              animalCard={{ 
                cardData:{
                  name: animal.name,
                  species:animal.species,
                  img:{
                    src: animal.img.src,
                    altText: animal.img.altText
                  },
                  scientificName:animal.scientificName,
                  sex:animal.sex? animal.sex : "Unknown",
                  dateofbirth: new Date(animal.dateofbirth),
                  story: animal.story,
                  conservationMission: animal.conservationmission
                }
              }}

              close={handleClose}
            />
            : null
          }
          <AnimalButton
            key={animal.name} // every animal will have a unique name
            name={animal.name}
            species={animal.species}
            img={{
              src: animal.img.src,
              altText: animal.img.altText
            }}

            expand={()=>handleExpand(animal.name)}
          />
        </>
      ))}
    </main>
  )
}
