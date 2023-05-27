import { useState, useRef, useEffect, useCallback } from 'react'

import AmbassadorCard from '../../../../utils/global/ambassadorCard/AmbassadorCard'
import AmbassadorButton from '../../../../utils/global/ambassadorButton/AmbassadorButton'
import { sortedAmbassadors, ambassadors, type AmbassadorKey } from '../../../../utils/ambassadors'

import arrow from '../../../../assets/arrow.jpg'

import styles from './ambassadorList.module.css'

export interface AmbassadorListProps {
  showAmbassadorList: boolean
  chatChosenAmbassador?: AmbassadorKey
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
      setActiveAmbassador(chatChosenAmbassador)
      scrollListToAmbassador(chatChosenAmbassador)
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
        upArrowRef.current?.classList.add(styles.arrowHidden)
      else if (ambassadorList.current.scrollTop + ambassadorList.current.clientHeight === ambassadorList.current.scrollHeight)
        downArrowRef.current?.classList.add(styles.arrowHidden)
      else {
        upArrowRef.current?.classList.remove(styles.arrowHidden)
        downArrowRef.current?.classList.remove(styles.arrowHidden)
      }
    }
  }, [])

  return (
    <div className={`${styles.ambassadorList} ${showAmbassadorList ? styles.visible : styles.hidden}`}>
      <div className={styles.scrollAmbassadors}>
        <button
          ref={upArrowRef}
          className={`${styles.arrow} ${styles.arrowUp} ${styles.arrowHidden}`}
          onClick={() => ambassadorListScroll(250)}
        >
          <img src={arrow} alt="Up Arrow"/>
        </button>

        <div ref={ambassadorList} className={styles.ambassadors} onScroll={handleArrowVisibility}>
          {sortedAmbassadors.map(([key, ambassador]) => (
            <AmbassadorButton
              key={key}
              ambassadorKey={key}
              ambassador={ambassador}
              onClick={() => {
                setActiveAmbassador(prev => prev === key ? undefined : key)
              }}
              className={`${styles.ambassadorButton} ${activeAmbassador === key ? styles.highlighted : undefined}`}
            />
          ))}
        </div>

        <button
          ref={downArrowRef}
          className={`${styles.arrow} ${styles.arrowDown}`}
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
          onClose={() => setActiveAmbassador(undefined)}
          className={styles.ambassadorCard}
        />
      )}
    </div>
  )
}
