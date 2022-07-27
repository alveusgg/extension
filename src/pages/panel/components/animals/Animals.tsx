//components
import AnimalButton from "../../../../utils/animalButton/AnimalButton";
import AnimalCardOverlay from "../animalCardOverlay/AnimalCardOverlay";
import LoadingSpinner from "../../../../utils/loadingSpinner/LoadingSpinner";

//css
import styles from './animals.module.css'
//data
import { useEffect, useState } from "react";
import { AnimalCardProps } from "../../../../utils/animalCard/AnimalCard";

export default function Animals() {
  const [animals, setAnimals] = useState<AnimalCardProps['cardData'][]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [animalCard, setAnimalCard] = useState("") //name of animal that will show up as a modal

  useEffect(()=>{
    const getAnimals = async () => {
      const response = await fetch('http://localhost:3000/api/animals')
      const data = await response.json()
      for(let i = 0; i < data.length; i++){
        data[i].img = {
          src: data[i].img,
          altText: data[i].img 
        }
      }
      setAnimals(data)
    }
    getAnimals().then(()=>{
      setIsLoaded(true)
    })
  }, [])

  function handleClose(): void{
    setAnimalCard("")
  }
  function handleGetCard(name: string): void {
    setAnimalCard(name)
  }

  return (
    <main className={styles.animals}> 

        {!isLoaded ? <LoadingSpinner/> : 
        <>
        {animals && animals.map(animal => (
          <>
            {animalCard === animal.name ? 
              <AnimalCardOverlay
                animalCard={{ 
                  cardData:{
                    ...animal,
                    img:{
                      src: "http://localhost:3000/images/"+animal.img.src,
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
                src: "http://localhost:3000/images/"+animal.img.src,
                altText: animal.img.altText
              }}

              getCard={()=>handleGetCard(animal.name)}
            />
          </>
        ))}
      </>}
    </main>
  )
}
