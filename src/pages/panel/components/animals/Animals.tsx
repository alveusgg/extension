//components
import AnimalButton from "../../../../utils/global/animalButton/AnimalButton";
import AnimalCardOverlay from "../animalCardOverlay/AnimalCardOverlay";

//css
import styles from './animals.module.css'
//data
import { useState } from "react";
import { AnimalCardProps } from "../../../../utils/global/animalCard/AnimalCard";
import AnimalData from "../../../../assets/animals.json";

export default function Animals() {
  const [animals, setAnimals] = useState(AnimalData)
  const [isLoaded, setIsLoaded] = useState(false)
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
                  ...animal,
                  img:{
                    src: animal.img.src,
                    altText: animal.img.altText
                  },
                  sex: animal.sex? animal.sex : "Unknown",
                  dateOfBirth: new Date(animal.dateOfBirth),
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
