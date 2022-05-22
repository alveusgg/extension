//components
import AnimalPreview from "../animalPreview/AnimalPreview";
import AnimalExpanded from "../animalExpanded/AnimalExpanded";

//css
import styles from './animals.module.css'
//data
import AnimalsData from "../../assets/animals.json"
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
            <AnimalExpanded
              name={animal.name}
              animalType={animal.animalType}
              imgSrc={animal.imgSrc}
              imgAltText={animal.imgAltText}
              expandedInfo={animal.expandedInfo}

              close={handleClose}
            />
            : null
          }
          <AnimalPreview 
            key={animal.name} // every animal will have a unique name
            name={animal.name}
            animalType={animal.animalType}
            imgSrc={animal.imgSrc}  
            imgAltText={animal.imgAltText} 

            expand={()=>handleExpand(animal.name)}
          />
        </>
      ))}
    </main>
  )
}
