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
  const [animalCard, setAnimalCard] = useState("") //name of animal that will show up as a modal

  function handleClose(): void{
    setAnimalCard("")
  }
  function handleGetCard(name: string): void {
    setAnimalCard(name)
  }

  return (
    <main className={styles.animals}>
      {animals && animals.map(animal => (
        <>
          {animalCard === animal.name ? 
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
                  dateOfBirth: new Date(animal.dateOfBirth),
                  story: animal.story,
                  conservationMission: animal.conservationMission
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

            getCard={()=>handleGetCard(animal.name)}
          />
        </>
      ))}
    </main>
  )
}
