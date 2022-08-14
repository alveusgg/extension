import { useEffect, useState } from 'react'
import AnimalCard, { AnimalCardProps } from '../../../utils/animalCard/AnimalCard'

import ActivationButtons from './ActivationButtons'
import AnimalButton from '../../../utils/animalButton/AnimalButton'

import styles from './overlay.module.css'

export default function Overlay() {
    const [animals, setAnimals] = useState<AnimalCardProps["cardData"][]>()
    const [activeAnimal, setActiveAnimal] = useState<AnimalCardProps["cardData"]>()
    const [isVisible, setIsVisible] = useState(false)

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

        //check if mouse is in the viewport
        document.addEventListener('mouseleave', () => {
            if(isVisible)
                setIsVisible(false)
        })
        document.addEventListener('mouseenter', () => {
            if(!isVisible)
                setIsVisible(true)
        })
    }, [])

    return (
    <div className={`${styles.overlay} ${isVisible? styles.visible : styles.hidden}`} >
        <ActivationButtons />

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

                    getCard={() => {setActiveAnimal(activeAnimal?._id === animal._id ? undefined : animal)}}
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
                close={() => {setActiveAnimal(undefined)}}
            />: null
        }
    </div>
    )
}
