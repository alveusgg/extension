//utils
import {useState, useRef, useEffect} from 'react'
import {AmbassadorCardProps} from '../../../../utils/global/ambassadorCard/AmbassadorCard'
import AmbassadorData from '../../../../assets/ambassadors.json'

//components
import AmbassadorCard from '../../../../utils/global/ambassadorCard/AmbassadorCard'
import AmbassadorButton from '../../../../utils/global/ambassadorButton/AmbassadorButton'

//css & assets
import styles from './ambassadorList.module.css'
import arrow from '../../../../assets/arrow.jpg'

export interface AmbassadorListProps {
  showAmbassadorList: boolean
  chatChosenAmbassador?: string
}

export default function AmbassadorList(props: AmbassadorListProps) {
  const [ambassadors] = useState(AmbassadorData)
  const [activeAmbassador, setActiveAmbassador] = useState<AmbassadorCardProps| null>()

  const upArrowRef = useRef<HTMLButtonElement>(null)
  const ambassadorList = useRef<HTMLDivElement>(null)
  const downArrowRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { // show the card of the ambassador that Twitch chat chose
    if (props.chatChosenAmbassador !== undefined) {
      const ambassador = ambassadors.find(ambassador => ambassador.cardFront.name.split(" ")[0].toLowerCase() === props.chatChosenAmbassador)
      if (ambassador) {
        setActiveAmbassador({cardFrontData: ambassador.cardFront, cardBackData: ambassador.cardBack})
        scrollListToAmbassador(ambassador.cardFront.name.split(" ")[0].toLowerCase())
      }
    }
  }, [props.chatChosenAmbassador, ambassadors])

  const scrollListToAmbassador = (name: string) => {
    if (!ambassadorList.current) return

    const offset = 200
    const anchorElement = ambassadorList.current.querySelector(`#${name}`)
    if (anchorElement instanceof HTMLDivElement)
      ambassadorList.current.scrollTo({top: Math.max(0, anchorElement.offsetTop - offset), behavior: "smooth"})
  }
  const ambassadorListScroll = (direction: number) => {
    if (ambassadorList.current)
      ambassadorList.current.scroll({top: ambassadorList.current.scrollTop - direction, left: 0, behavior: 'smooth'})
  }
  const handleArrowVisibility = () => {
    if (ambassadorList.current) {
      if (ambassadorList.current.scrollTop === 0)
        upArrowRef.current?.classList.add(styles.hideArrow)
      else if (ambassadorList.current.scrollTop + ambassadorList.current.clientHeight === ambassadorList.current.scrollHeight)
        downArrowRef.current?.classList.add(styles.hideArrow)
      else {
        upArrowRef.current?.classList.remove(styles.hideArrow)
        downArrowRef.current?.classList.remove(styles.hideArrow)
      }
    }
  }

  return (
    <div className={styles.ambassadorList}>
      <div className={`${styles.scrollAmbassadors} ${props.showAmbassadorList ? styles.visible : styles.hidden}`}>
        <button ref={upArrowRef} className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`}
                onClick={() => ambassadorListScroll(250)}>
          <img src={arrow} alt="Up Arrow"/>
        </button>
        <div ref={ambassadorList} className={styles.ambassadors} onScroll={() => handleArrowVisibility()}>
          {ambassadors && ambassadors.map(ambassador => (
            <AmbassadorButton
              key={ambassador.cardFront.name}
              name={ambassador.cardFront.name}
              species={ambassador.cardFront.species}
              img={{
                src: ambassador.cardFront.img.src,
                altText: ambassador.cardFront.img.altText
              }}

              getCard={() => {
                setActiveAmbassador(
                  activeAmbassador?.cardFrontData.name === ambassador.cardFront.name ? undefined
                  : {cardFrontData: ambassador.cardFront, cardBackData: ambassador.cardBack}
                )
              }}

              ClassName={`${styles.ambassadorButton} ${activeAmbassador?.cardFrontData.name === ambassador.cardFront.name ? styles.ambassadorButtonClicked : undefined}`}
              Id={ambassador.cardFront.name.split(" ")[0].toLowerCase()}
            />
          ))}
        </div>
        <button ref={downArrowRef} className={`${styles.arrow} ${styles.down}`}
                onClick={() => ambassadorListScroll(-250)}>
          <img src={arrow} alt="Down Arrow"/>
        </button>
      </div>

      {activeAmbassador && props.showAmbassadorList ?
        <AmbassadorCard
          key={activeAmbassador.cardFrontData.name}
          cardFrontData={activeAmbassador.cardFrontData}
          cardBackData={activeAmbassador.cardBackData}
          close={() => {
            setActiveAmbassador(undefined)
          }}
          ClassName={styles.ambassadorCard}
        /> : null
      }
    </div>
  )
}
