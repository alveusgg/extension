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

import { normalizeAmbassadorName } from "../../hooks/useChatCommand";

import IconInfo from "../icons/IconInfo";

import Tooltip from "../tooltip/Tooltip";

import moderatorBadge from "../../assets/mod.svg";

import styles from "./ambassadorCard.module.scss";

import Tilt from "react-parallax-tilt";

const offsetPosition = (position: AmbassadorImage["position"]) => {
  const [x, y] = (position || "50% 50%").split(" ");
  return `${x} min(calc(${y} + 1.5rem), 0%)`;
};

export interface AmbassadorCardProps {
  ambassadorKey: AmbassadorKey;
  ambassador: AmbassadorType;
  onClose?: () => void;
  className?: string;
  disableCardEffects?: boolean;
}

export default function AmbassadorCard(props: AmbassadorCardProps) {
  const { ambassadorKey, ambassador, onClose, className, disableCardEffects } =
    props;
  const images = getAmbassadorImages(ambassadorKey);
  const mod =
    window?.Twitch?.ext?.viewer?.role === "broadcaster" ||
    window?.Twitch?.ext?.viewer?.role === "moderator";
  const glareOpacity = disableCardEffects ? 0.0 : 0.5;

  return (
    <Tilt
      tiltEnable={!disableCardEffects}
      glareEnable={!disableCardEffects}
      glareMaxOpacity={glareOpacity}
      glareBorderRadius="1rem"
      glarePosition="bottom"
      scale={1.0}
      perspective={5000}
      className={classes(styles.ambassadorCard, className)}
    >
      <div
        className={classes(
          ambassador.birth && isBirthday(ambassador.birth) && styles.birthday,
        )}
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
                <code>!{normalizeAmbassadorName(ambassador.name, true)}</code>{" "}
                in chat.
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
    </Tilt>
  );
}
