import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";

import Buttons from '../buttons/Buttons'

import useChatCommand from '../../../../utils/chatCommand'
import { isAmbassadorKey, type AmbassadorKey } from '../../../../utils/ambassadors'
import { classes } from '../../../../utils/classes'
import useSettings from '../../hooks/useSettings'
import useSleeping from '../../hooks/useSleeping'

import WelcomeIcon from "../../../../assets/overlay/welcome.png";
import WelcomeOverlay from "./welcome/Welcome";

import AmbassadorsIcon from "../../../../assets/overlay/ambassadors.png";
import AmbassadorsOverlay from "./ambassadors/Ambassadors";

import SettingsIcon from "../../../../assets/overlay/settings.png";
import SettingsOverlay from "./settings/Settings";

import styles from "./overlay.module.scss";

// Show command-triggered popups for 10s
const commandTimeout = 10_000

const overlayOptions = [
  {
    key: "welcome",
    title: "Welcome",
    type: "primary",
    icon: WelcomeIcon,
    component: WelcomeOverlay,
  },
  {
    key: "ambassadors",
    title: "Ambassadors",
    type: "primary",
    icon: AmbassadorsIcon,
    component: AmbassadorsOverlay,
  },
  {
    key: "settings",
    title: "Settings",
    type: "secondary",
    icon: SettingsIcon,
    component: SettingsOverlay,
  },
] as const;

type OverlayKey = (typeof overlayOptions)[number]["key"];

export interface OverlayOptionProps {
  context: {
    commandAmbassador?: AmbassadorKey,
  },
  className?: string,
}

export default function Overlay() {
  const settings = useSettings()
  const { sleeping, wake, on: addSleepListener, off: removeSleepListener } = useSleeping()

  const [commandAmbassador, setCommandAmbassador] = useState<AmbassadorKey>()
  const [visibleOption, setVisibleOption] = useState<OverlayKey>()
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const awakingRef = useRef(false)

  // When a chat command is run, wake the overlay
  useChatCommand(
    useCallback(
      (command: string) => {
        if (!settings.disableChatPopup.value) {
          if (isAmbassadorKey(command)) setCommandAmbassador(command);
          else if (command !== "welcome") return;

          // Show the card
          setVisibleOption(command === "welcome" ? "welcome" : "ambassadors");

      // Dismiss the overlay after a delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setVisibleOption(undefined)
      }, commandTimeout)

      // Track that we're waking up, so that we don't immediately clear the timeout, and wake the overlay
      awakingRef.current = true
      wake(commandTimeout)
    }
  }, [settings.disableChatPopup, wake]))

  // Ensure we clean up the timer when we unmount
  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  // If the user interacts with the overlay, clear the auto-dismiss timer
  // Except if we just triggered this wake, in which case we want to ignore it
  useEffect(() => {
    const callback = () => {
      if (awakingRef.current) awakingRef.current = false
      else if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    addSleepListener('wake', callback)
    return () => removeSleepListener('wake', callback)
  }, [addSleepListener, removeSleepListener])

  // Handle body clicks, dismissing the overlay if the user clicks outside of it
  const bodyClick = useCallback((e: MouseEvent) => {
    // Get all the elements under the mouse
    const elements = document.elementsFromPoint(e.clientX, e.clientY);

    // For each element, if it has a background then we want to ignore the click
    // If we reach the body, then break out of the loop and close the panels
    for (const element of elements) {
      if (element === document.body) break;

      const style = getComputedStyle(element);
      if (
        style.backgroundImage !== "none" ||
        style.backgroundColor !== "rgba(0, 0, 0, 0)"
      ) {
        return;
      }
    }

    setVisibleOption(undefined);
  }, []);

  // If the user clicks anywhere in the body, except the overlay itself, close the panels
  // Bind it during the capture phase so that we can process it before any other click handlers
  useEffect(() => {
    document.body.addEventListener("click", bodyClick, true);
    return () => document.body.removeEventListener("click", bodyClick, true);
  }, [bodyClick]);

  // Generate the context for the overlay options
  const context = useMemo<OverlayOptionProps["context"]>(() => ({
    commandAmbassador,
  }), [commandAmbassador])

  // Block sleeping hiding the overlay if dev toggle is on
  let hiddenClass = sleeping && styles.overlayHidden
  if (process.env.NODE_ENV === 'development' && settings.disableOverlayHiding.value)
    hiddenClass = false

  return (
    <div className={classes(styles.overlay, hiddenClass)}>
      <Buttons
        options={overlayOptions}
        onClick={setVisibleOption}
        active={visibleOption}
      />
      <div className={styles.wrapper}>
        {overlayOptions.map((option) => (
          <option.component
            key={option.key}
            context={context}
            className={classes(
              styles.option,
              visibleOption !== option.key && styles.optionHidden
            )}
          />
        ))}
      </div>
    </div>
  );
}
