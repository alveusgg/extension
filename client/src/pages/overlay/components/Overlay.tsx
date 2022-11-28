import { useEffect, useRef, useState } from 'react'
import AnimalCard, { AnimalCardProps } from '../../../utils/global/animalCard/AnimalCard'
import AnimalData from '../../../assets/animals.json'

import ActivationButtons from './ActivationButtons'
import AnimalButton from '../../../utils/global/animalButton/AnimalButton'

import styles from './overlay.module.css'

export default function Overlay() {
    const [animals, setAnimals] = useState(AnimalData)
    const [showAnimalList, setShowAnimalList] = useState(false)
    const [activeAnimal, setActiveAnimal] = useState<AnimalCardProps["cardData"] | null>()
    const [isVisible, setIsVisible] = useState(false)

    const upArrowRef = useRef<HTMLImageElement>(null)
    const animalList = useRef<HTMLDivElement>(null)
    const downArrowRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        //check if mouse is in the viewport
        document.addEventListener('mouseleave', () => {
            setIsVisible(false)
        })
        document.addEventListener('mouseenter', () => {
            setIsVisible(true)
        })
    }, [])

    const animalListScroll = (direction: number) => {
        if(animalList.current)
            animalList.current.scroll({top: animalList.current.scrollTop - direction, left: 0, behavior: 'smooth'})
    }
    const handleArrowVisibility = () => {
        if(animalList.current){
            if(animalList.current.scrollTop === 0)
                upArrowRef.current?.classList.add(styles.hideArrow)
            else if(animalList.current.scrollTop + animalList.current.clientHeight === animalList.current.scrollHeight)
                downArrowRef.current?.classList.add(styles.hideArrow)
            else{
                upArrowRef.current?.classList.remove(styles.hideArrow)
                downArrowRef.current?.classList.remove(styles.hideArrow)
            }
        }
    }

    return (
    <div className={`${styles.overlay} ${isVisible? styles.visible : styles.hidden}`} >
        <ActivationButtons 
            toggleShowAnimalList={() => setShowAnimalList(!showAnimalList)}
        />

        <div className={`${styles.scrollAnimals} ${showAnimalList? styles.visible : styles.hidden}`}>
            <div ref={upArrowRef} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`} onClick={()=>animalListScroll(250)} />
            <div ref={animalList} className={styles.animalList} onScroll={()=>handleArrowVisibility()}>
                {animals && animals.map(animal => (
                    <AnimalButton
                        key={animal.name}
                        name={animal.name}
                        species={animal.species}
                        img={{
                            src: animal.img.src,
                            altText: animal.img.altText
                        }}

                        getCard={(name) => {setActiveAnimal(activeAnimal?.name === animal.name ? undefined : {...animal, dateOfBirth: new Date(animal.dateOfBirth) })}}
                        containerClassName={`${styles.animalButton} ${activeAnimal?.name === animal.name ? styles.animalButtonClicked : undefined}`}
                    />
                ))}
            </div>
            <div ref={downArrowRef} className={`${styles.arrow} ${styles.down}`} onClick={()=>animalListScroll(-250)} />
        </div>

        { activeAnimal && showAnimalList ? 
            <AnimalCard
                key={activeAnimal.name}
                cardData={{
                    ...activeAnimal,
                    img:{
                        src: activeAnimal.img.src,
                        altText: activeAnimal.img.altText
                    },
                    dateOfBirth: new Date(activeAnimal.dateOfBirth)
                }}
                close={() => {setActiveAnimal(undefined)}}
                containerClassName={styles.animalCard}
            />: null
        }
    </div>
    )
}
