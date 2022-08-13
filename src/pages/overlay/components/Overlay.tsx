import { useEffect, useState } from 'react'
import { AnimalCardProps } from '../../../utils/animalCard/AnimalCard'

import ActivationButtons from './ActivationButtons'
import AnimalButton from '../../../utils/animalButton/AnimalButton'

import styles from './overlay.module.css'

export default function Overlay() {
    const [animals, setAnimals] = useState<AnimalCardProps["cardData"][]>()

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


    return (
    <div className={styles.overlay}>
        <ActivationButtons/>

        <div className={styles.animalList}>
            {animals && animals.map(animal => (
                <AnimalButton
                    key={animal.name}
                    name={animal.name}
                    species={animal.species}
                    img={{
                        src: "http://localhost:3000/images/"+animal.img.src,
                        altText: animal.img.altText
                    }}

                    getCard={() => {}}
                />
            ))}
        </div>
    </div>
    )
}
