import { useRef, useEffect, useCallback, type MouseEvent } from "react";
import { Transition } from "@headlessui/react";

import AmbassadorCard from "../../../../components/AmbassadorCard";
import AmbassadorButton from "../../../../components/AmbassadorButton";

import { useAmbassadors } from "../../../../hooks/useAmbassadors";
import { classes } from "../../../../utils/classes";

import type { OverlayOptionProps } from "./Overlay";

import IconChevron from "../../../../components/icons/IconChevron";

const arrowClass =
  "absolute border-0 cursor-pointer text-alveus-green w-full h-[var(--list-fade-padding)] z-20 transition-opacity group pt-[var(--twitch-vertical-padding)] pb-4 box-content";
const arrowSvgClass =
  "mx-auto drop-shadow-lg overflow-visible transition-transform group-hover:scale-125 group-focus:scale-125";
const arrowPathClass =
  "[&_path]:stroke-alveus-tan [&_path]:stroke-[0.25rem] [&_path]:[paint-order:stroke] [&_path]:transition-[stroke] [&_path]:group-hover:stroke-highlight [&_path]:group-hover:stroke-[0.375rem] [&_path]:group-focus:stroke-highlight [&_path]:group-focus:stroke-[0.375rem]";
const hiddenClass = "opacity-0 pointer-events-none";

export default function Ambassadors(props: OverlayOptionProps) {
  const {
    context: { activeAmbassador, setActiveAmbassador },
    className,
  } = props;

  const ambassadors = useAmbassadors();

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
        upArrowRef.current?.classList.add(...hiddenClass.split(" "));
      else if (
        ambassadorList.current.scrollTop +
          ambassadorList.current.clientHeight ===
        ambassadorList.current.scrollHeight
      )
        downArrowRef.current?.classList.add(...hiddenClass.split(" "));
      else {
        upArrowRef.current?.classList.remove(...hiddenClass.split(" "));
        downArrowRef.current?.classList.remove(...hiddenClass.split(" "));
      }
    }
  }, []);

  // Check the arrow visibility on mount
  // Sometimes browsers restore odd scroll positions
  useEffect(() => {
    handleArrowVisibility();
  }, [handleArrowVisibility]);

  return (
    <div
      className={classes(
        "grid-cols-2-auto absolute left-0 top-0 z-0 grid h-full grid-rows-1",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={ambassadorList}
          className="list-fade scrollbar-none -my-[var(--twitch-vertical-padding)] flex w-40 flex-col items-center gap-4 overflow-scroll px-4 py-[calc(var(--twitch-vertical-padding)+var(--list-fade-padding))]"
          onScroll={handleArrowVisibility}
        >
          {ambassadors.map(([key]) => (
            <AmbassadorButton
              key={key}
              ambassador={key}
              onClick={() => {
                setActiveAmbassador((prev) =>
                  prev.key === key ? {} : { key },
                );
              }}
              className={classes(
                activeAmbassador.key === key && "outline-highlight outline",
              )}
            />
          ))}
        </div>

        <button
          ref={upArrowRef}
          className={classes(
            arrowClass,
            "-top-[var(--twitch-vertical-padding)]",
            hiddenClass,
          )}
          onClick={(e) => ambassadorListScroll(e, 250)}
          title="Scroll up"
          type="button"
          data-transparent-clicks
        >
          <IconChevron className={classes(arrowSvgClass, arrowPathClass)} />
        </button>

        <button
          ref={downArrowRef}
          className={classes(
            arrowClass,
            "-bottom-[var(--twitch-vertical-padding)] rotate-180",
          )}
          onClick={(e) => ambassadorListScroll(e, -250)}
          title="Scroll down"
          type="button"
          data-transparent-clicks
        >
          <IconChevron className={classes(arrowSvgClass, arrowPathClass)} />
        </button>
      </div>

      {ambassadors.map(([key]) => (
        <Transition show={activeAmbassador.key === key} key={key}>
          <AmbassadorCard
            key={key}
            ambassador={key}
            onClose={() => setActiveAmbassador({})}
            className="z-0 col-start-2 row-start-1 origin-[center_left] self-center transition-[opacity,transform] will-change-[opacity,transform] data-[closed]:-translate-x-10 data-[closed]:opacity-0 data-[closed]:motion-reduce:translate-x-0"
          />
        </Transition>
      ))}
    </div>
  );
}
