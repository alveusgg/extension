//utils
import { useState, useRef, useEffect } from 'react'
import {AmbassadorCardProps} from '../../../../utils/global/ambassadorCard/AmbassadorCard'
import AmbassadorData from '../../../../assets/ambassadors.json'

//components
import AmbassadorCard from '../../../../utils/global/ambassadorCard/AmbassadorCard'
import AmbassadorButton from '../../../../utils/global/ambassadorButton/AmbassadorButton'

//css & assets
import styles from './ambassadorList.module.css'
import arrow from '../../../../assets/arrow.jpg'

export interface AmbassadorListProps{
    showAmbassadorList: boolean
    chatChosenAmbassador?: string
}
export default function AmbassadorList(props: AmbassadorListProps){
    const [ambassadors] = useState(AmbassadorData)
    const [activeAmbassador, setActiveAmbassador] = useState<AmbassadorCardProps["cardData"] | null>()

    const upArrowRef = useRef<HTMLImageElement>(null)
    const ambassadorList = useRef<HTMLDivElement>(null)
    const downArrowRef = useRef<HTMLImageElement>(null)

    useEffect(() =>{ // show the card of the ambassador that Twitch chat chose
        if(props.chatChosenAmbassador !== undefined){
            const ambassador = ambassadors.find(ambassador => ambassador.name.split(" ")[0].toLowerCase() === props.chatChosenAmbassador)
            if(ambassador){
                setActiveAmbassador(ambassador)
                scrollListToAmbassador(ambassador.name.split(" ")[0].toLowerCase())
            }
        }
    }, [props.chatChosenAmbassador])

    const scrollListToAmbassador = (name: string) => {
        if(!ambassadorList.current)
            return

        const offset = 200
        const anchorElement = ambassadorList.current.querySelector(`#${name}`)
        if(anchorElement instanceof HTMLDivElement)
            ambassadorList.current.scrollTo({top: Math.max(0, anchorElement.offsetTop - offset), behavior: "smooth"})
    }
    const ambassadorListScroll = (direction: number) => {
        if(ambassadorList.current)
            ambassadorList.current.scroll({top: ambassadorList.current.scrollTop - direction, left: 0, behavior: 'smooth'})
    }
    const handleArrowVisibility = () => {
        if(ambassadorList.current){
            if(ambassadorList.current.scrollTop === 0)
                upArrowRef.current?.classList.add(styles.hideArrow)
            else if(ambassadorList.current.scrollTop + ambassadorList.current.clientHeight === ambassadorList.current.scrollHeight)
                downArrowRef.current?.classList.add(styles.hideArrow)
            else{
                upArrowRef.current?.classList.remove(styles.hideArrow)
                downArrowRef.current?.classList.remove(styles.hideArrow)
            }
        }
    }

    return (
        <div className={styles.ambassadorList}>
            <div className={`${styles.scrollAmbassadors} ${props.showAmbassadorList? styles.visible : styles.hidden}`}>
                <img ref={upArrowRef} src={arrow} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`} onClick={()=>ambassadorListScroll(250)} alt="Up Arrow"/>
                <div ref={ambassadorList} className={styles.ambassadors} onScroll={()=>handleArrowVisibility()}>
                    {ambassadors && ambassadors.map(ambassador => (
                        <AmbassadorButton
                            key={ambassador.name}
                            name={ambassador.name}
                            species={ambassador.species}
                            img={{
                                src: ambassador.img.src,
                                altText: ambassador.img.altText
                            }}

                            getCard={() => {setActiveAmbassador(activeAmbassador?.name === ambassador.name ? undefined : ambassador)}}

                            ClassName={`${styles.ambassadorButton} ${activeAmbassador?.name === ambassador.name ? styles.ambassadorButtonClicked : undefined}`}
                            Id={ambassador.name.split(" ")[0].toLowerCase()}
                        />
                    ))}
                </div>
                <img ref={downArrowRef} src={arrow} className={`${styles.arrow} ${styles.down}`} onClick={()=>ambassadorListScroll(-250)} alt="Down Arrow"/>
            </div>

            { activeAmbassador && props.showAmbassadorList ? 
                <AmbassadorCard
                    key={activeAmbassador.name}
                    cardData={activeAmbassador}
                    close={() => {setActiveAmbassador(undefined)}}
                    ClassName={styles.ambassadorCard}
                />: null
            }
        </div>
    )
}