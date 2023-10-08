import { useRef, useEffect, useCallback, type MouseEvent } from "react";

import AmbassadorCard from "../../../../../components/ambassadorCard/AmbassadorCard";
import AmbassadorButton from "../../../../../components/ambassadorButton/AmbassadorButton";

import {
  sortedAmbassadors,
  ambassadors,
} from "../../../../../utils/ambassadors";
import { classes } from "../../../../../utils/classes";

import type { OverlayOptionProps } from "../Overlay";

import styles from "./ambassadors.module.scss";
import IconChevron from "../../../../../components/icons/IconChevron";

export default function Ambassadors(props: OverlayOptionProps) {
  const {
    context: { activeAmbassador, setActiveAmbassador },
    className,
  } = props;

  const upArrowRef = useRef<HTMLButtonElement>(null);
  const ambassadorList = useRef<HTMLDivElement>(null);
  const downArrowRef = useRef<HTMLButtonElement>(null);

  // Scroll the ambassador list to the selected ambassador
  useEffect(() => {
    if (
      !ambassadorList.current ||
      !activeAmbassador.key ||
      !activeAmbassador.isCommand
    )
      return;

    const offset = 200;
    const anchorElement = ambassadorList.current.querySelector(
      `#${activeAmbassador.key}`,
    );
    if (anchorElement instanceof HTMLButtonElement)
      ambassadorList.current.scrollTo({
        top: Math.max(0, anchorElement.offsetTop - offset),
        behavior: "smooth",
      });
  }, [activeAmbassador]);

  // Allow the list to be scrolled via the buttons
  const ambassadorListScroll = useCallback(
    (event: MouseEvent, direction: number) => {
      if (ambassadorList.current) {
        event.stopPropagation();

        ambassadorList.current.scroll({
          top: ambassadorList.current.scrollTop - direction,
          left: 0,
          behavior: "smooth",
        });
      }
    },
    [],
  );

  // Ensure the buttons are only shown if the list is scrollable
  const handleArrowVisibility = useCallback(() => {
    if (ambassadorList.current) {
      if (ambassadorList.current.scrollTop === 0)
        upArrowRef.current?.classList.add(styles.hidden);
      else if (
        ambassadorList.current.scrollTop +
          ambassadorList.current.clientHeight ===
        ambassadorList.current.scrollHeight
      )
        downArrowRef.current?.classList.add(styles.hidden);
      else {
        upArrowRef.current?.classList.remove(styles.hidden);
        downArrowRef.current?.classList.remove(styles.hidden);
      }
    }
  }, []);

  return (
    <div className={classes(styles.ambassadorList, className)}>
      <div className={styles.scroll}>
        <div
          ref={ambassadorList}
          className={styles.ambassadors}
          onScroll={handleArrowVisibility}
        >
          {sortedAmbassadors.map(([key, ambassador]) => (
            <AmbassadorButton
              key={key}
              ambassadorKey={key}
              ambassador={ambassador}
              onClick={() => {
                setActiveAmbassador((prev) =>
                  prev.key === key ? {} : { key },
                );
              }}
              className={classes(
                styles.ambassadorButton,
                activeAmbassador.key === key && styles.highlighted,
              )}
            />
          ))}
        </div>

        <button
          ref={upArrowRef}
          className={classes(styles.arrow, styles.up, styles.hidden)}
          onClick={(e) => ambassadorListScroll(e, 250)}
          title="Scroll up"
        >
          <IconChevron />
        </button>

        <button
          ref={downArrowRef}
          className={classes(styles.arrow, styles.down)}
          onClick={(e) => ambassadorListScroll(e, -250)}
          title="Scroll down"
        >
          <IconChevron />
        </button>
      </div>

      {activeAmbassador.key && (
        <AmbassadorCard
          key={activeAmbassador.key}
          ambassadorKey={activeAmbassador.key}
          ambassador={ambassadors[activeAmbassador.key]}
          onClose={() => setActiveAmbassador({})}
          className={styles.ambassadorCard}
        />
      )}
    </div>
  );
}
