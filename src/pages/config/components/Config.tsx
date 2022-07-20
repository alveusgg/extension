import styles from './config.module.css'

import AnimalData from '../../../assets/animals.json'
import AnimalButton from '../../../utils/animalButton/AnimalButton'

import { Link } from 'react-router-dom'
import { AnimalCardProps } from '../../../utils/animalCard/AnimalCard'
import { useEffect, useState } from 'react'

interface  ConfigProps {
  handleEditCard: (animal: AnimalCardProps["cardData"]) => void
}
export default function Config(props: ConfigProps) {
  const [animals, setAnimals] = useState<AnimalCardProps['cardData'][]>([])

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
    getAnimals()
  }, [])

  return (
    <div className={styles.config}>

      <h1>Manage Your Ambassadors</h1>
      <p>Click an ambassador to edit or delete it.</p>
      <Link to={`/animalEditor`}>
        <button className={styles.newAmbassadorButton} 
          onClick={()=>props.handleEditCard(
            {
              img: {
                src: "unknownAnimalProfilePic.jpg",
                altText: "Unknown Animal"
              },
              name: "Name",
              species: "",
              scientificName: "",
              sex: "Unknown",
              dateOfBirth: new Date(),
              story: "",
              conservationMission: ""
            }
        )} >+ New Ambassador</button>
      </Link>

      <div className={styles.animalList}>
        {
          animals.map(animal => (
            <Link to={`/animalEditor`}>
              <AnimalButton
                key={animal.name}
                name={animal.name}
                species={animal.species}
                img={{
                  src: "http://localhost:3000/images/"+animal.img.src,
                  altText: animal.img.altText
                }}
                
                getCard={() => {props.handleEditCard(
                  {
                    ...animal,
                    dateOfBirth: new Date(animal.dateOfBirth)
                  }
                )}}
              />
            </Link>
          ))
        }

      </div>
    </div>
  )
}
