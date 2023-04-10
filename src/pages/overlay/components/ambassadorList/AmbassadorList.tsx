//utils
import { useState, useRef, useEffect, useCallback } from 'react'
import ambassadors, { ambassadorEntries, type AmbassadorKey } from '@alveusgg/data/src/ambassadors/core'

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
  const { showAmbassadorList, chatChosenAmbassador } = props

  const [activeAmbassador, setActiveAmbassador] = useState<AmbassadorKey>()
  const upArrowRef = useRef<HTMLButtonElement>(null)
  const ambassadorList = useRef<HTMLDivElement>(null)
  const downArrowRef = useRef<HTMLButtonElement>(null)

  // Scroll the ambassador list to the selected ambassador
  const scrollListToAmbassador = useCallback((name: AmbassadorKey) => {
    if (!ambassadorList.current) return

    const offset = 200
    const anchorElement = ambassadorList.current.querySelector(`#${name}`)
    if (anchorElement instanceof HTMLDivElement)
      ambassadorList.current.scrollTo({top: Math.max(0, anchorElement.offsetTop - offset), behavior: "smooth"})
  }, [])

  // Show the ambassador command based on chat commands
  useEffect(() => {
    if (chatChosenAmbassador !== undefined) {
      const ambassador = ambassadorEntries.find(([, ambassador]) => ambassador.name.split(" ")[0].toLowerCase() === chatChosenAmbassador)
      if (ambassador) {
        setActiveAmbassador(ambassador[0])
        scrollListToAmbassador(ambassador[0])
      }
    }
  }, [chatChosenAmbassador, scrollListToAmbassador])

  // Allow the list to be scrolled via the buttons
  const ambassadorListScroll = useCallback((direction: number) => {
    if (ambassadorList.current)
      ambassadorList.current.scroll({top: ambassadorList.current.scrollTop - direction, left: 0, behavior: 'smooth'})
  }, [])

  // Ensure the buttons are only shown if the list is scrollable
  const handleArrowVisibility = useCallback(() => {
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
  }, [])

  return (
    <div className={styles.ambassadorList}>
      <div className={`${styles.scrollAmbassadors} ${showAmbassadorList ? styles.visible : styles.hidden}`}>
        <button
          ref={upArrowRef}
          className={`${styles.arrow} ${styles.up} ${styles.hideArrow}`}
          onClick={() => ambassadorListScroll(250)}
        >
          <img src={arrow} alt="Up Arrow"/>
        </button>

        <div ref={ambassadorList} className={styles.ambassadors} onScroll={handleArrowVisibility}>
          {ambassadorEntries.map(([key, ambassador]) => (
            <AmbassadorButton
              key={key}
              ambassadorKey={key}
              ambassador={ambassador}
              getCard={() => {
                setActiveAmbassador(prev => prev === key ? undefined : key)
              }}
              ClassName={`${styles.ambassadorButton} ${activeAmbassador === key ? styles.ambassadorButtonClicked : undefined}`}
              Id={key}
            />
          ))}
        </div>

        <button
          ref={downArrowRef}
          className={`${styles.arrow} ${styles.down}`}
          onClick={() => ambassadorListScroll(-250)}
        >
          <img src={arrow} alt="Down Arrow"/>
        </button>
      </div>

      {activeAmbassador && showAmbassadorList && (
        <AmbassadorCard
          key={activeAmbassador}
          ambassadorKey={activeAmbassador}
          ambassador={ambassadors[activeAmbassador]}
          close={() => {
            setActiveAmbassador(undefined)
          }}
          ClassName={styles.ambassadorCard}
        />
      )}
    </div>
  )
}
