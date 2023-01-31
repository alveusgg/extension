// utils
import { useEffect, useRef, useReducer } from 'react'
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

  const [{showAmbassadorList, showAlveusIntro}, dispatch] = useReducer(OverlayReducer, {
    showAmbassadorList: false,
    showAlveusIntro: false
  })

  const chosenAmbassador = useChatCommand()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const awakingRef = useRef(false)

  // When a chat command is run, show the list and auto-dismiss it after 6s
  useEffect(() => {
    if (chosenAmbassador !== undefined && !settings.disableChatPopup) {
      // Show the list, and dismiss it after 6s
      dispatch({type: ACTIONS.SHOW_AMBASSADOR_LIST})
      timeoutRef.current = setTimeout(() => {dispatch({type: ACTIONS.HIDE_AMBASSADOR_LIST})}, 6000)

      // Track that we're waking up, so that we don't immediately clear the timeout
      awakingRef.current = true

      // Wake the overlay for 8s
      wake(8000)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [chosenAmbassador, settings.disableChatPopup, wake])

  // If the user interacts with the overlay, clear the auto-dismiss timer
  useEffect(() => {
    const callback = () => {
      if (awakingRef.current) awakingRef.current = false
      else if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    awoken.add(callback)
    return () => awoken.remove(callback)
  }, [awoken])

    return (
    <div className={`${styles.overlay} ${props.sleeping ? styles.hidden : styles.visible}`} >
        <ActivationButtons
            toggleShowAmbassadorList={() => dispatch({type: ACTIONS.TOGGLE_AMBASSADOR_LIST})}
            toggleShowAlveusIntro={() => dispatch({type: ACTIONS.TOGGLE_ALVEUS_INTRO})}
        />
        <AlveusIntro
            showAlveusIntro={showAlveusIntro}
        />
        <AmbassadorList
            showAmbassadorList={showAmbassadorList}
            chatChosenAmbassador={chosenAmbassador?.slice(1)}
        />
    </div>
  )
}
