import { useEffect, useRef, useState } from 'react'
import AnimalCard, { AnimalCardProps } from '../../../utils/global/animalCard/AnimalCard'

import ActivationButtons from './ActivationButtons'
import AnimalButton from '../../../utils/global/animalButton/AnimalButton'

import styles from './overlay.module.css'
//images
import DownArrow from '../../../assets/downarrow.svg'

//utils
import { server } from '../../../utils/constants'

export default function Overlay() {
    const [animals, setAnimals] = useState<AnimalCardProps["cardData"][]>()
    const [showAnimalList, setShowAnimalList] = useState(false)
    const [activeAnimal, setActiveAnimal] = useState<AnimalCardProps["cardData"]>()
    const [isVisible, setIsVisible] = useState(false)

    const upArrowRef = useRef<HTMLImageElement>(null)
    const animalList = useRef<HTMLDivElement>(null)
    const downArrowRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const getAnimals = async () => {
            const response = await fetch(server.url+'/api/animals')
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
            <img ref={upArrowRef} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`} src={DownArrow} alt="Arrow" onClick={()=>animalListScroll(250)} />
            <div ref={animalList} className={styles.animalList} onScroll={()=>handleArrowVisibility()}>
                {animals && animals.map(animal => (
                    <AnimalButton
                        key={animal._id}
                        name={animal.name}
                        species={animal.species}
                        img={{
                            src: server.url+"/images/"+animal.img.src,
                            altText: animal.img.altText
                        }}

                        getCard={() => {setActiveAnimal(activeAnimal?._id === animal._id ? undefined : animal)}}
                        containerClassName={`${styles.animalButton} ${activeAnimal?._id === animal._id ? styles.animalButtonClicked : undefined}`}
                    />
                ))}
            </div>
            <img ref={downArrowRef} className={styles.arrow} src={DownArrow} alt="Arrow" onClick={()=>animalListScroll(-250)} />
        </div>

        { activeAnimal && showAnimalList ? 
            <AnimalCard
                key={activeAnimal._id}
                cardData={{
                    ...activeAnimal,
                    img:{
                        src: server.url+"/images/"+activeAnimal.img.src,
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
