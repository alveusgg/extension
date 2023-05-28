import { useEffect, useRef, useCallback, useState, useMemo } from 'react'

import Buttons from '../buttons/Buttons'
import Welcome from './welcome/Welcome'
import Ambassadors from './ambassadors/Ambassadors'
import useChatCommand from '../../../../utils/chatCommand'
import { isAmbassadorKey, type AmbassadorKey } from '../../../../utils/ambassadors'
import { classes } from '../../../../utils/classes'

import WelcomeIcon from '../../../../assets/activationButtons/welcome.jpg'
import AmbassadorsIcon from '../../../../assets/activationButtons/ambassadors.jpg'

import styles from './overlay.module.css'

interface OverlayProps {
  sleeping: boolean,
  awoken: {
    add: (callback: () => void) => void,
    remove: (callback: () => void) => void
  },
  wake: (time: number) => void,
  settings: {
    disableChatPopup: boolean
  },
}

const overlayOptions = [
  {
    key: 'welcome',
    title: 'Welcome',
    icon: WelcomeIcon,
    component: Welcome,
  },
  {
    key: 'ambassadors',
    title: 'Ambassadors',
    icon: AmbassadorsIcon,
    component: Ambassadors,
  },
] as const

type OverlayKey = typeof overlayOptions[number]['key']

export interface OverlayOptionProps {
  context: {
    commandAmbassador?: AmbassadorKey,
  },
  className?: string,
}

export default function Overlay(props: OverlayProps) {
  const { sleeping, awoken, wake, settings } = props

  const [commandAmbassador, setCommandAmbassador] = useState<AmbassadorKey>()
  const [visibleOption, setVisibleOption] = useState<OverlayKey>()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const awakingRef = useRef(false)
  const commandDelay = 8000

  // When a chat command is run, wake the overlay
  useChatCommand(useCallback((command: string) => {
    if (!settings.disableChatPopup) {
      if (isAmbassadorKey(command)) setCommandAmbassador(command)
      else if (command !== 'welcome') return

      // Show the card
      setVisibleOption(command === 'welcome' ? 'welcome' : 'ambassadors')

      // Dismiss the overlay after a delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setVisibleOption(undefined)
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

  // Handle body clicks, dismissing the overlay if the user clicks outside of it
  const bodyClick = useCallback((e: MouseEvent) => {
    // Get all the elements under the mouse
    const elements = document.elementsFromPoint(e.clientX, e.clientY)

    // For each element, if it has a background then we want to ignore the click
    // If we reach the body, then break out of the loop and close the panels
    for (const element of elements) {
      if (element === document.body) break;

      const style = getComputedStyle(element)
      if (style.backgroundImage !== 'none' || style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        return
      }
    }

    setVisibleOption(undefined)
  }, []);

  // If the user clicks anywhere in the body, except the overlay itself, close the panels
  // Bind it during the capture phase so that we can process it before any other click handlers
  useEffect(() => {
    document.body.addEventListener('click', bodyClick, true);
    return () => document.body.removeEventListener('click', bodyClick, true);
  }, [bodyClick]);

  // Generate the context for the overlay options
  const context = useMemo<OverlayOptionProps["context"]>(() => ({
    commandAmbassador,
  }), [commandAmbassador])

  return (
    <div className={classes(styles.overlay, sleeping && styles.overlayHidden)}>
      <Buttons
        options={overlayOptions}
        onClick={setVisibleOption}
        active={visibleOption}
      />
      <div className={styles.wrapper}>
        {overlayOptions.map(option => (
          <option.component
            key={option.key}
            context={context}
            className={classes(styles.option, visibleOption !== option.key && styles.optionHidden)}
          />
        ))}
      </div>
    </div>
  )
}
