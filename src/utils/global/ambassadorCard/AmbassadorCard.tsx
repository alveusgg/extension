import { calculateAge, formatDate, isBirthday } from '../../dateManager'
import { getAmbassadorImages, getIUCNStatus, type AmbassadorKey, type Ambassador as AmbassadorType } from '../../ambassadors'
import { normalizeAmbassadorName } from '../../chatCommand'
import { camelToKebab } from '../../helpers'
import { classes } from '../../classes'

import styles from './ambassadorCard.module.scss'
import moderatorBadge from '../../../assets/mod.png'

export interface AmbassadorCardProps {
  ambassadorKey: AmbassadorKey
  ambassador: AmbassadorType
  onClose?: () => void
  className?: string
}

export default function AmbassadorCard(props: AmbassadorCardProps) {
  const { ambassadorKey, ambassador, onClose, className } = props
  const images = getAmbassadorImages(ambassadorKey)
  const particlesInit = useCallback(async (engine: Engine) => {
      await loadFull(engine);
  }, []);
  const mod = window?.Twitch?.ext?.viewer?.role === 'broadcaster' || window?.Twitch?.ext?.viewer?.role === 'moderator'

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
      await console.log(container);
  }, []);
  const options: ISourceOptions = particleConfig as ISourceOptions;
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
            {ambassador.birth && isBirthday(ambassador.birth) ? <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} /> : ""}
            <p>
              {ambassador.birth ? formatDate(ambassador.birth) : "Unknown"}
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <h3>Conservation Status</h3>
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
