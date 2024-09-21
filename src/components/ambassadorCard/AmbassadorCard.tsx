import { useCallback, useEffect, useRef } from "react";
import type { CreateTypes } from "canvas-confetti";
import Confetti from "react-canvas-confetti";

import { calculateAge, formatDate, isBirthday } from "../../utils/dateManager";
import {
  getClassification,
  getAmbassadorImages,
  getIUCNStatus,
  type AmbassadorKey,
  type Ambassador as AmbassadorType,
  type AmbassadorImage,
} from "../../utils/ambassadors";
import { camelToKebab } from "../../utils/helpers";
import { classes } from "../../utils/classes";

import IconInfo from "../icons/IconInfo";

import Tooltip from "../tooltip/Tooltip";

import moderatorBadge from "../../assets/mod.svg";

import styles from "./ambassadorCard.module.scss";

const offsetPosition = (position: AmbassadorImage["position"]) => {
  const [x, y] = (position || "50% 50%").split(" ");
  return `${x} min(calc(${y} + 1.5rem), 0%)`;
};

export interface AmbassadorCardProps {
  ambassadorKey: AmbassadorKey;
  ambassador: AmbassadorType;
  onClose?: () => void;
  className?: string;
}

export default function AmbassadorCard(props: AmbassadorCardProps) {
  const { ambassadorKey, ambassador, onClose, className } = props;
  const images = getAmbassadorImages(ambassadorKey);
  const mod =
    window?.Twitch?.ext?.viewer?.role === "broadcaster" ||
    window?.Twitch?.ext?.viewer?.role === "moderator";

  const birthday = ambassador.birth && isBirthday(ambassador.birth);

  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const confettiInit = useCallback(
    ({ confetti }: { confetti: CreateTypes }) => {
      const node = ref.current;
      if (
        !node ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      timeout.current = setTimeout(() => {
        const rect = node.getBoundingClientRect();
        const origin = {
          x: (rect.x + rect.width / 2) / window.innerWidth,
          y: (rect.y + rect.height / 2) / window.innerHeight,
        };

        confetti({
          spread: 26,
          startVelocity: 55,
          origin,
          particleCount: Math.floor(200 * 0.25),
        });
        confetti({
          spread: 60,
          origin,
          particleCount: Math.floor(200 * 0.2),
        });
        confetti({
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
          origin,
          particleCount: Math.floor(200 * 0.35),
        });
        confetti({
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
          origin,
          particleCount: Math.floor(200 * 0.1),
        });
        confetti({
          spread: 120,
          startVelocity: 45,
          origin,
          particleCount: Math.floor(200 * 0.1),
        });
      }, 500);
    },
    [origin],
  );
  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <>
      {birthday && <Confetti onInit={confettiInit} />}
      <div
        className={classes(
          styles.ambassadorCard,
          birthday && styles.birthday,
          className,
        )}
        ref={ref}
      >
        <div className={styles.hero}>
          <img
            className={styles.img}
            src={images[0].src}
            alt={images[0].alt}
            style={{ objectPosition: offsetPosition(images[0].position) }}
          />

          <div className={styles.overlay}>
            {props.onClose && (
              <button
                className={styles.close}
                onClick={onClose}
                type="button"
                aria-label="Close"
              >
                &times;
              </button>
            )}

            <h2 className={styles.name} title={ambassador.name}>
              {ambassador.name}
            </h2>
          </div>
        </div>

        <div className={styles.scrollable}>
          {mod && (
            <div className={styles.mod}>
              <img src={moderatorBadge} alt="Moderator badge" />
              <p>
                Show this card to everyone by using{" "}
                <code>!{ambassador.commands[0]}</code> in chat.
              </p>
            </div>
          )}

          <div>
            <h3>Species</h3>
            <p>{ambassador.species}</p>
            <p>
              <i>
                {ambassador.scientific} ({getClassification(ambassador.class)})
              </i>
            </p>
          </div>

          <div className={styles.compact}>
            <div>
              <h3>Sex</h3>
              <p>{ambassador.sex || "Unknown"}</p>
            </div>
            <div>
              <h3>Age</h3>
              <p>
                {ambassador.birth ? calculateAge(ambassador.birth) : "Unknown"}
              </p>
            </div>
            <div>
              <h3>Birthday</h3>
              <p>
                {ambassador.birth ? formatDate(ambassador.birth) : "Unknown"}
              </p>
            </div>
          </div>

          <div>
            <h3>Story</h3>
            <p>{ambassador.story}</p>
          </div>

          <div>
            <h3>Conservation Mission</h3>
            <p>{ambassador.mission}</p>
          </div>

          <div>
            <Tooltip
              text="An objective assessment system for classifying the status of plants, animals, and other organisms threatened with extinction."
              maxWidth="18rem"
              fontSize="0.9rem"
            >
              <div className={styles.info}>
                <h3>Conservation Status</h3>
                <IconInfo size={20} />
              </div>
            </Tooltip>
            <p>IUCN: {getIUCNStatus(ambassador.iucn.status)}</p>
          </div>

          <div>
            <h3>Native To</h3>
            <p>{ambassador.native.text}</p>
          </div>

          <div>
            <h3>Arrived at Alveus</h3>
            <p>
              {ambassador.arrival
                ? formatDate(ambassador.arrival, false)
                : "Unknown"}
            </p>
          </div>

          <div className={styles.site}>
            <p>
              Learn more about {ambassador.name} on the{" "}
              <a
                href={`https://www.alveussanctuary.org/ambassadors/${camelToKebab(
                  ambassadorKey,
                )}`}
                rel="noreferrer"
                target="_blank"
              >
                Alveus Sanctuary website
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
