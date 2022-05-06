//components
import AnimalPreview from "../animalPreview/AnimalPreview";
//css
import styles from './animals.module.css'
//data
import AnimalsData from "../../assets/animals.json"
import { useState } from "react";

export default function Animals() {
  const [animals, setAnimals] = useState(AnimalsData)

  function handleClose(){
    setAnimals(AnimalsData)
  }
  function handleExpand(name: string): void {
  }
  return (
    <main className={styles.animals}>

      {animals && animals.map(animal => (
          <AnimalPreview 
            key={animal.name} // every animal will have a unique name
            name={animal.name}
            animalType={animal.animalType}
            imgSrc={animal.imgSrc}  
            imgAltText={animal.imgAltText} 

            expand={()=> handleExpand(animal.name)}
          />
      ))}
    </main>
  )
}
