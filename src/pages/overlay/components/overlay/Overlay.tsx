// utils
import { useEffect, useRef, useReducer, useCallback, useState } from 'react'
import { ACTIONS, OverlayReducer } from './overlay.reducer'

//components & hooks
import ActivationButtons from '../activationButtons/ActivationButtons'
import AlveusIntro from '../alveusIntro/AlveusIntro'
import AmbassadorList from '../ambassadorList/AmbassadorList'
import useChatCommand from '../../../../utils/chatCommand'

//css
import styles from './overlay.module.css'

interface OverlayProps {
  sleeping: boolean,
  awoken: {
    add: (callback: () => void) => void,
    remove: (callback: () => void) => void
  }
  wake: (time: number) => void,
  settings: {
    disableChatPopup: boolean
  }
}

export default function Overlay(props: OverlayProps) {
  const { sleeping, awoken, wake, settings } = props

  const [chosenAmbassador, setChosenAmbassador] = useState<string | undefined>(undefined)
  const [{showAmbassadorList, showAlveusIntro}, dispatch] = useReducer(OverlayReducer, {
    showAmbassadorList: false,
    showAlveusIntro: false
  })
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const awakingRef = useRef(false)
  const commandDelay = 8000

  // When a chat command is run, wake the overlay
  useChatCommand(useCallback((command: string) => {
    if (!settings.disableChatPopup) {
      if (command !== '!welcome') setChosenAmbassador(command.slice(1))

      // Show the card
      dispatch({type: command === '!welcome' ? ACTIONS.SHOW_ALVEUS_INTRO : ACTIONS.SHOW_AMBASSADOR_LIST})

      // Dismiss the overlay after a delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        dispatch({type: command === '!welcome' ? ACTIONS.HIDE_ALVEUS_INTRO : ACTIONS.HIDE_AMBASSADOR_LIST})
      }, commandDelay)

      // Track that we're waking up, so that we don't immediately clear the timeout, and wake the overlay
      awakingRef.current = true
      wake(commandDelay)
    }
  }, [settings.disableChatPopup, commandDelay, wake]))

  // Ensure we clean up the timer when we unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // If the user interacts with the overlay, clear the auto-dismiss timer
  useEffect(() => {
    const callback = () => {
      if (awakingRef.current) awakingRef.current = false
      else if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    awoken.add(callback)
    return () => awoken.remove(callback)
  }, [awoken])

  const overlayRef = useRef<HTMLDivElement>(null);
  const bodyClick = useCallback((e: MouseEvent) => {
    // If the click was inside the overlay parent, and wasn't the overlay itself, ignore it
    // Check the parent so that clicking on the settings doesn't close the panels
    if (!overlayRef.current
      || (overlayRef.current !== e.target && (overlayRef.current.parentElement as Node).contains(e.target as Node))) return

    // Otherwise, close the panels
    dispatch({type: ACTIONS.HIDE_AMBASSADOR_LIST})
    dispatch({type: ACTIONS.HIDE_ALVEUS_INTRO})
  }, []);

  // If the user clicks anywhere in the body, except the overlay itself, close the panels
  useEffect(() => {
    document.body.addEventListener('click', bodyClick);
    return () => document.body.removeEventListener('click', bodyClick);
  }, [bodyClick]);

  return (
    <div ref={overlayRef} className={`${styles.overlay} ${sleeping ? styles.hidden : styles.visible}`}>
      <ActivationButtons
        toggleShowAmbassadorList={() => dispatch({type: showAmbassadorList ? ACTIONS.HIDE_AMBASSADOR_LIST : ACTIONS.SHOW_AMBASSADOR_LIST})}
        toggleShowAlveusIntro={() => dispatch({type: showAlveusIntro ? ACTIONS.HIDE_ALVEUS_INTRO : ACTIONS.SHOW_ALVEUS_INTRO})}
      />
      <AlveusIntro
        showAlveusIntro={showAlveusIntro}
      />
      <AmbassadorList
        showAmbassadorList={showAmbassadorList}
        chatChosenAmbassador={chosenAmbassador}
      />
    </div>
  )
}
