import { useState } from 'react'

import { calculateAge, formatDate, isBirthday } from '../../dateManager'
import { getAmbassadorImages, getIUCNStatus, type AmbassadorKey, type Ambassador as AmbassadorType } from '../../ambassadors'
import { normalizeAmbassadorName } from '../../chatCommand'
import { camelToKebab } from '../../helpers'
import { classes } from '../../classes'

import styles from './ambassadorCard.module.scss'
import moderatorBadge from '../../../assets/mod.png'

import Tooltip from '../tooltip/Tooltip'

export interface AmbassadorCardProps {
  ambassadorKey: AmbassadorKey
  ambassador: AmbassadorType
  onClose?: () => void
  className?: string
}

export default function AmbassadorCard(props: AmbassadorCardProps) {
  const { ambassadorKey, ambassador, onClose, className } = props
  const images = getAmbassadorImages(ambassadorKey)
  const mod = window?.Twitch?.ext?.viewer?.role === 'broadcaster' || window?.Twitch?.ext?.viewer?.role === 'moderator'

  const [iucnTooltipShown, setIucnTooltipShown] = useState(false);

  const iucnText = "An objective assessment systems for classifying the status of plants, animals, and other organisms threatened with extinction."
  const iucnInfoIcon = (
    <button
      onMouseEnter={() => setIucnTooltipShown(true)}
      onMouseLeave={() => setIucnTooltipShown(false)}
      className={styles.iucnInfoIcon}
    >
    {/* svg sourced from https://icons.getbootstrap.com/icons/info-circle-fill/. The Tailwind-recommended https://heroicons.com/ wasn't friendly for resizing */}
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg>
    <Tooltip
      text={iucnText}
      isShown={iucnTooltipShown}
      offsetLeft={11}
      offsetTop={16.75}
      width={18}
    />
    </button>
  );

  return (
    <div className={classes(styles.ambassadorCard, className, ambassador.birth && isBirthday(ambassador.birth) && styles.birthday)}>
      {props.onClose && (
        <div className={styles.close} onClick={onClose}>&times;</div>
      )}

      <h2 className={styles.name} title={ambassador.name}>{ambassador.name}</h2>
      <img
        className={styles.img}
        src={images[0].src}
        alt={images[0].alt}
        style={{ objectPosition: images[0].position }}
      />

      <div className={styles.scrollable}>
        {mod && (
          <div className={classes(styles.row, styles.mod)}>
            <img src={moderatorBadge} alt="Moderator badge" />
            <p>
              Show this card to everyone by using
              {' '}
              <code>!{normalizeAmbassadorName(ambassador.name, true)}</code>
              {' '}
              in chat.
            </p>
          </div>
        )}

        <div className={styles.row}>
          <h3>Species</h3>
          <p>{ambassador.species}</p>
          <p><i>{ambassador.scientific}</i></p>
        </div>

        <div className={classes(styles.row, styles.compact)}>
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

        <div className={styles.row}>
          <h3>Conservation Status {iucnInfoIcon}</h3>
          <p>IUCN: {getIUCNStatus(ambassador.iucn.status)}</p>
        </div>

        <div className={styles.row}>
          <h3>Story</h3>
          <p>{ambassador.story}</p>
        </div>

        <div className={styles.row}>
          <h3>Conservation Mission</h3>
          <p>{ambassador.mission}</p>
        </div>

        <div className={classes(styles.row, styles.site)}>
          <p>
            Learn more about {ambassador.name} on the
            {' '}
            <a
              href={`https://www.alveussanctuary.org/ambassadors/${camelToKebab(ambassadorKey)}`}
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
  )
}
