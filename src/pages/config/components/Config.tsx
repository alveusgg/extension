import styles from './config.module.css'

import AnimalData from '../../../assets/animals.json'
import AnimalButton from '../../../utils/animalButton/AnimalButton'
import LoadingSpinner from '../../../utils/loadingSpinner/LoadingSpinner'

import { Link } from 'react-router-dom'
import { AnimalCardProps } from '../../../utils/animalCard/AnimalCard'
import { useEffect, useState } from 'react'

interface  ConfigProps {
  handleEditCard: (animal: AnimalCardProps["cardData"]) => void
  changeEditMode: (editMode: "create" | "update") => void
}
export default function Config(props: ConfigProps) {
  const [animals, setAnimals] = useState<AnimalCardProps['cardData'][]>([])
  const [isLoaded, setIsLoaded] = useState(false)

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

  return (
    <div className={styles.config}>

      <h1>Manage Your Ambassadors</h1>
      <p>Click an ambassador to edit or delete it.</p>
      <Link to={`/animalEditor`}>
        <button className={styles.newAmbassadorButton} 
          onClick={()=>{
            props.handleEditCard(
              {
                _id: '',
                img: {
                  src: "unknownAnimalProfilePic.jpg",
                  altText: "Unknown Animal"
                },
                name: "Name",
                species: "",
                scientificName: "",
                sex: "Unknown",
                dateOfBirth: new Date(),
                iucnStatus: "",
                story: "",
                conservationMission: ""
              }
          );
          props.changeEditMode("create")
        }} >+ New Ambassador</button>
      </Link>

      { !isLoaded ?  <LoadingSpinner/> :

        <div className={styles.animalList}>
          { animals.map(animal => (
              <Link to={`/animalEditor`} key={animal.name}>
                <AnimalButton
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
                  changeEditMode={() => {props.changeEditMode("update")}}
                />
              </Link>
            ))}
        </div>
      }
    </div>
  )
}
