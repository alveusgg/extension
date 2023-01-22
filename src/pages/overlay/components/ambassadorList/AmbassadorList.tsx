//utils
import {useState, useRef, useEffect} from 'react'
import AmbassadorData from '../../../../assets/ambassadors.json'

//components
import AmbassadorCard from '../../../../utils/global/ambassadorCard/AmbassadorCard'
import AmbassadorButton from '../../../../utils/global/ambassadorButton/AmbassadorButton'

//css & map-assets
import styles from './ambassadorList.module.css'
import arrow from '../../../../assets/arrow.jpg'

export interface AmbassadorListProps{
    showAmbassadorList: boolean
    selectedAmbassadorId?: string
    setSelectedAmbassadorId: (name?: string) => void
}
export default function AmbassadorList(props: AmbassadorListProps){
    const [ambassadors] = useState(AmbassadorData)

    const upArrowRef = useRef<HTMLButtonElement>(null)
    const ambassadorList = useRef<HTMLDivElement>(null)
    const downArrowRef = useRef<HTMLButtonElement>(null)

    useEffect(() =>{ // show the card of the ambassador that Twitch chat chose
        if(props.selectedAmbassadorId !== undefined)
            scrollListToAmbassador(props.selectedAmbassadorId)
    }, [props.selectedAmbassadorId])

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

    const activeAmbassador = props.selectedAmbassadorId !== undefined && ambassadors.find(ambassador => ambassador.id === props.selectedAmbassadorId)

    return (
        <div className={styles.ambassadorList}>
            <div className={`${styles.scrollAmbassadors} ${props.showAmbassadorList? styles.visible : styles.hidden}`}>
                <button ref={upArrowRef} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`} onClick={()=>ambassadorListScroll(250)}>
                    <img src={arrow} alt="Up Arrow"/>
                </button>
                <div ref={ambassadorList} className={styles.ambassadors} onScroll={()=>handleArrowVisibility()}>
                    {ambassadors && ambassadors.map(ambassador => (
                        <AmbassadorButton
                            key={ambassador.id}
                            name={ambassador.name}
                            species={ambassador.species}
                            img={{
                                src: ambassador.img.src,
                                altText: ambassador.img.altText
                            }}

                            getCard={() => {props.setSelectedAmbassadorId(props.selectedAmbassadorId === ambassador.id ? undefined : ambassador.id)}}

                            ClassName={`${styles.ambassadorButton} ${props.selectedAmbassadorId === ambassador.id ? styles.ambassadorButtonClicked : undefined}`}
                            Id={ambassador.id}
                        />
                    ))}
                </div>
                <button ref={downArrowRef} className={`${styles.arrow} ${styles.down}`} onClick={()=>ambassadorListScroll(-250)}>
                    <img src={arrow} alt="Down Arrow"/>
                </button>
            </div>

            { activeAmbassador && props.showAmbassadorList ?
                <AmbassadorCard
                    key={activeAmbassador.id}
                    cardData={activeAmbassador}
                    close={() => {props.setSelectedAmbassadorId(undefined)}}
                    ClassName={styles.ambassadorCard}
                />: null
            }
        </div>
    )
}