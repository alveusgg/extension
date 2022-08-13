import { useEffect, useState } from 'react'
import AnimalCard, { AnimalCardProps } from '../../../utils/animalCard/AnimalCard'

import ActivationButtons from './ActivationButtons'
import AnimalButton from '../../../utils/animalButton/AnimalButton'

import styles from './overlay.module.css'

export default function Overlay() {
    const [animals, setAnimals] = useState<AnimalCardProps["cardData"][]>()
    const [activeAnimal, setActiveAnimal] = useState<AnimalCardProps["cardData"]>()

    useEffect(() => {
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

    const handleClick = (animal: AnimalCardProps["cardData"]) => {
        if(activeAnimal?._id === animal._id) 
            setActiveAnimal(undefined)
        else
            setActiveAnimal(animal)
    }

    return (
    <div className={styles.overlay}>
        <ActivationButtons/>

        <div className={styles.animalList}>
            {animals && animals.map(animal => (
                <AnimalButton
                    key={animal._id}
                    name={animal.name}
                    species={animal.species}
                    img={{
                        src: "http://localhost:3000/images/"+animal.img.src,
                        altText: animal.img.altText
                    }}

                    getCard={() => {handleClick(animal)}}
                />
            ))}
        </div>

        { activeAnimal ? 
            <AnimalCard
                key={activeAnimal._id}
                cardData={{
                    ...activeAnimal,
                    img:{
                        src: "http://localhost:3000/images/"+activeAnimal.img.src,
                        altText: activeAnimal.img.altText
                    },
                    dateOfBirth: new Date(activeAnimal.dateOfBirth)
                }}
            />: null
        }
    </div>
    )
}
