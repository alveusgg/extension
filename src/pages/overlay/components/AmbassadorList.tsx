//utils
import { useState, useRef, useEffect } from 'react'
import {AnimalCardProps} from '../../../utils/global/animalCard/AnimalCard'
import AnimalData from '../../../assets/animals.json'

//components
import AnimalCard from '../../../utils/global/animalCard/AnimalCard'
import AnimalButton from '../../../utils/global/animalButton/AnimalButton'

//css & assets
import styles from './ambassadorList.module.css'
import arrow from '../../../assets/arrow.jpg'

const SCROLL_OFFSET = 200;

function scrollListToAnimal(listElement: HTMLDivElement | null, name: string) {
    if (!listElement) {
        return;
    }

    const anchorElement = listElement.querySelector(
        `[data-animal-name="${name}"]`
    );
    if (anchorElement instanceof HTMLDivElement) {
        listElement.scrollTo({
            top: Math.max(0, anchorElement.offsetTop - SCROLL_OFFSET),
            behavior: "smooth",
        });
    }
}

export interface AmbassadorListProps{
    showAnimalList: boolean
    chatChosenAmbassador?: string
}

export default function AmbassadorList(props: AmbassadorListProps){
    const [animals] = useState(AnimalData)
    const [activeAnimal, setActiveAnimal] = useState<AnimalCardProps["cardData"] | null>()

    const upArrowRef = useRef<HTMLImageElement>(null)
    const animalList = useRef<HTMLDivElement>(null)
    const downArrowRef = useRef<HTMLImageElement>(null)

    useEffect(() =>{ // show the card of the animal that Twitch chat
        if(props.chatChosenAmbassador !== undefined){
            const animal = animals.find(animal => animal.name.split(" ")[0].toLowerCase() === props.chatChosenAmbassador)
            if (animal) {
                setActiveAnimal(animal);
                scrollListToAnimal(animalList.current, animal.name);
            }
        }
    }, [props.chatChosenAmbassador])

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
        <div className={styles.ambassadorList}>
            <div className={`${styles.scrollAnimals} ${props.showAnimalList? styles.visible : styles.hidden}`}>
                <img ref={upArrowRef} src={arrow} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`} onClick={()=>animalListScroll(250)} alt="Up Arrow"/>
                <div ref={animalList} className={styles.animalList} onScroll={()=>handleArrowVisibility()}>
                    {animals && animals.map(animal => (
                        <div data-animal-name={animal.name}>
                            <AnimalButton
                                key={animal.name}
                                name={animal.name}
                                species={animal.species}
                                img={{
                                    src: animal.img.src,
                                    altText: animal.img.altText
                                }}

                                getCard={() => {setActiveAnimal(activeAnimal?.name === animal.name ? undefined : animal)}}
                                containerClassName={`${styles.animalButton} ${activeAnimal?.name === animal.name ? styles.animalButtonClicked : undefined}`}
                            />
                        </div>
                    ))}
                </div>
                <img ref={downArrowRef} src={arrow} className={`${styles.arrow} ${styles.down}`} onClick={()=>animalListScroll(-250)} alt="Down Arrow"/>
            </div>

            { activeAnimal && props.showAnimalList ? 
                <AnimalCard
                    key={activeAnimal.name}
                    cardData={activeAnimal}
                    close={() => {setActiveAnimal(undefined)}}
                    containerClassName={styles.animalCard}
                />: null
            }
        </div>
    )
}