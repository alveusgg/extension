import { useEffect, useRef, useState } from 'react'
import AnimalCard, { AnimalCardProps } from '../../../utils/global/animalCard/AnimalCard'
import AnimalData from '../../../assets/animals.json'
import tmi from 'tmi.js'

import ActivationButtons from './ActivationButtons'
import AnimalButton from '../../../utils/global/animalButton/AnimalButton'

import styles from './overlay.module.css'
import arrow from '../../../assets/arrow.jpg'

export default function Overlay() {
    //TODO: clean up. Custom hooks? There are a lot of functions that are used for one thing.
    const [animals] = useState<AnimalCardProps["cardData"][]>(
        AnimalData.map((animal) => {
            return {
                ...animal,
                dateOfBirth: new Date(animal.dateOfBirth)
            }
        })
    )
    const [client] = useState<tmi.Client>(new tmi.Client({
            identity: {
                username: 'abdullahmorrison',
                password: 'oauth:' + process.env.REACT_APP_USER_ACCESS_TOKEN
            },
            channels: [
                // 'maya',
                // 'alveussanctuary',
                'abdullahmorrison'
            ]
        }))
    const [showOverlay, setShowOverlay] = useState(false)
    const [showAnimalList, setShowAnimalList] = useState(false)
    const [activeAnimal, setActiveAnimal] = useState<AnimalCardProps["cardData"] | null>()

    const upArrowRef = useRef<HTMLImageElement>(null)
    const animalList = useRef<HTMLDivElement>(null)
    const downArrowRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        connectToTwitch()
        showOverlayOnMouseHover()

        return () => {
            disconnectFromTwitch()
        }
    }, [])

    const connectToTwitch = () => {
        client.on('message', onMessageHandler)
        client.on('connected', onConnectedHandler)

        client.connect();
    }
    const disconnectFromTwitch = () => {
        client.disconnect()
        console.log("Disconnected from Twitch")
    }
    const showOverlayOnMouseHover = () => {
        let body = document.querySelector("body")
        //check if mouse is in the viewport
        if(body !== null){
            body.addEventListener('mouseleave', () => {
                setShowOverlay(false)
            })
        }
        if(body !== null){
            body.addEventListener('mouseenter', () => {
                setShowOverlay(true)
            })
        }
    }

    const onMessageHandler = (target: string, context: tmi.ChatUserstate, msg: string, self: boolean) => {
        if (self) { return; } // Ignore messages from the bot
        let ambassadorNames =  animals.map((animal)=> animal.name.toLowerCase().split(" ")[0])

        const commandName = msg.trim().toLowerCase();

        //does the message contain a "!" followed by any of the ambassador names
        if (ambassadorNames.find((name: String)=> commandName.includes(`!${name}`))){
            console.log(`Executing command ${commandName}`)
            let animal = animals.find((animal)=> animal.name.toLowerCase().split(" ")[0] === commandName.split("!")[1])
            setShowOverlay(true)
            setShowAnimalList(true)
            setActiveAnimal(animal)
        }else{
            console.log("Command Not Found")
        }

    }
    const onConnectedHandler = (addr: string, port: number) => {
        console.log(`Connected to ${addr}:${port}`);
    }


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
    <div className={`${styles.overlay} ${showOverlay? styles.visible : styles.hidden}`} >
        <ActivationButtons 
            toggleShowAnimalList={() => setShowAnimalList(!showAnimalList)}
        />

        <div className={`${styles.scrollAnimals} ${showAnimalList? styles.visible : styles.hidden}`}>
            <img ref={upArrowRef} src={arrow} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`} onClick={()=>animalListScroll(250)} alt="Up Arrow"/>
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
            <img ref={downArrowRef} src={arrow} className={`${styles.arrow} ${styles.down}`} onClick={()=>animalListScroll(-250)} alt="Down Arrow"/>
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
