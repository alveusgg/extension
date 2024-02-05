import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
  type SetStateAction,
  type Dispatch,
} from "react";

import IconWelcome from "../../../../components/icons/IconWelcome";
import IconAmbassadors from "../../../../components/icons/IconAmbassadors";
import IconSettings from "../../../../components/icons/IconSettings";

import {
  isAmbassadorKey,
  type AmbassadorKey,
} from "../../../../utils/ambassadors";
import { classes } from "../../../../utils/classes";
import { visibleUnderCursor } from "../../../../utils/dom";

import useChatCommand from "../../../../hooks/useChatCommand";

import useSettings from "../../hooks/useSettings";
import useSleeping from "../../hooks/useSleeping";

import WelcomeOverlay from "./welcome/WelcomeOverlay";
import AmbassadorsOverlay from "./ambassadors/Ambassadors";
import SettingsOverlay from "./settings/Settings";

import Buttons from "../buttons/Buttons";

import styles from "./overlay.module.scss";

// Show command-triggered popups for 10s
const commandTimeout = 10_000;

const overlayOptions = [
  {
    key: "welcome",
    type: "primary",
    icon: IconWelcome,
    title: "Welcome to Alveus",
    component: WelcomeOverlay,
  },
  {
    key: "ambassadors",
    type: "primary",
    icon: IconAmbassadors,
    title: "Explore our Ambassadors",
    component: AmbassadorsOverlay,
  },
  {
    key: "settings",
    type: "secondary",
    icon: IconSettings,
    title: "Extension Settings",
    component: SettingsOverlay,
  },
] as const;

type OverlayKey = (typeof overlayOptions)[number]["key"];

type ActiveAmbassadorState = {
  key?: AmbassadorKey;
  isCommand?: boolean;
};

export interface OverlayOptionProps {
  context: {
    activeAmbassador: ActiveAmbassadorState;
    setActiveAmbassador: Dispatch<SetStateAction<ActiveAmbassadorState>>;
  };
  className?: string;
}

export default function Overlay() {
  const settings = useSettings();
  const {
    sleeping,
    wake,
    on: addSleepListener,
    off: removeSleepListener,
  } = useSleeping();

  const [activeAmbassador, setActiveAmbassador] =
    useState<ActiveAmbassadorState>({});
  const [visibleOption, setVisibleOption] = useState<OverlayKey>();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const awakingRef = useRef(false);

  // When a chat command is run, wake the overlay
  useChatCommand(
    useCallback(
      (command: string) => {
        if (!settings.disableChatPopup.value) {
          if (isAmbassadorKey(command))
            setActiveAmbassador({ key: command, isCommand: true });
          else if (command !== "welcome") return;

          // Show the card
          setVisibleOption(command === "welcome" ? "welcome" : "ambassadors");

          // Dismiss the overlay after a delay
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setVisibleOption(undefined);
            setActiveAmbassador({});
          }, commandTimeout);

          // Track that we're waking up, so that we don't immediately clear the timeout, and wake the overlay
          awakingRef.current = true;
          wake(commandTimeout);
        }
      },
      [settings.disableChatPopup, wake],
    ),
  );

  // Ensure we clean up the timer when we unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  // If the user interacts with the overlay, clear the auto-dismiss timer
  // Except if we just triggered this wake, in which case we want to ignore it
  useEffect(() => {
    const callback = () => {
      if (awakingRef.current) awakingRef.current = false;
      else if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    addSleepListener("wake", callback);
    return () => removeSleepListener("wake", callback);
  }, [addSleepListener, removeSleepListener]);

  // Handle body clicks, dismissing the overlay if the user clicks outside of it
  const bodyClick = useCallback((e: MouseEvent) => {
    if (!visibleUnderCursor(e)) {
      setVisibleOption(undefined);
    }
  }, []);

  // If the user clicks anywhere in the body, except the overlay itself, close the panels
  // Bind it during the capture phase so that we can process it before any other click handlers
  useEffect(() => {
    document.body.addEventListener("click", bodyClick, true);
    return () => document.body.removeEventListener("click", bodyClick, true);
  }, [bodyClick]);

  // Handle body double clicks, ignoring them inside of overlay elements
  const bodyDblClick = useCallback((e: MouseEvent) => {
    if (visibleUnderCursor(e)) {
      e.stopPropagation();
    }
  }, []);

  // If the user double clicks anywhere in the overlay itself, stop propagating the event
  // This stops double clicks from toggling fullscreen video which is the default behavior
  useEffect(() => {
    document.body.addEventListener("dblclick", bodyDblClick, true);
    return () =>
      document.body.removeEventListener("dblclick", bodyDblClick, true);
  }, [bodyDblClick]);

  // Generate the context for the overlay options
  const context = useMemo<OverlayOptionProps["context"]>(
    () => ({
      activeAmbassador,
      setActiveAmbassador,
    }),
    [activeAmbassador],
  );

  // Block sleeping hiding the overlay if dev toggle is on
  let hiddenClass = sleeping && styles.overlayHidden;
  if (
    process.env.NODE_ENV === "development" &&
    settings.disableOverlayHiding.value
  )
    hiddenClass = false;

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
              visibleOption !== option.key && styles.optionHidden,
            )}
          />
        ))}
      </div>
    </div>
  );
}
