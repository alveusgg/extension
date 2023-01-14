//components & hooks
import AnimalButton from "../../../../utils/global/animalButton/AnimalButton";
import AnimalCardOverlay from "../animalCardOverlay/AnimalCardOverlay";
import useChatCommand from "../../../../utils/chatCommand";

//css
import styles from './animals.module.css'

//data
import { useState, useEffect } from "react";
import AnimalData from "../../../../assets/animals.json";


export default function Animals() {
  const [animals] = useState(AnimalData)
  const [animalCard, setAnimalCard] = useState("") //name of animal that will show up as a modal
  const chosenAmbassador = useChatCommand()?.slice(1)

  useEffect(() => {
    if(chosenAmbassador !== undefined){
      setAnimalCard(animals.find(animal => animal.name.split(" ")[0].toLowerCase() === chosenAmbassador)?.name || "")
    }
  }, [chosenAmbassador, animals])

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
              animalCard={{cardData: animal}}

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
