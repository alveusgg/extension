import { useCallback } from 'react'

import { getAmbassadorImages, type AmbassadorKey, type Ambassador as AmbassadorType } from '../../ambassdaors'
import styles from './ambassadorButton.module.css'

interface AmbassadorButtonProps{
  ambassadorKey: AmbassadorKey
  ambassador: AmbassadorType

  getCard?: (name: string) => void
  changeEditMode?: () => void

  ClassName?: string
  Id?: string
}

export default function AmbassadorButton(props: AmbassadorButtonProps) {
  const { ambassadorKey, ambassador, getCard, changeEditMode, ClassName, Id } = props
  const images = getAmbassadorImages(ambassadorKey)

  const handleClick = useCallback(() => {
    if (getCard)
      getCard(ambassador.name)

    if (changeEditMode)
      changeEditMode()
  }, [getCard, changeEditMode, ambassador.name])

  return (
    <div className={`${styles.ambassador} ${ClassName}`} id={Id} onClick={handleClick}>
      <img
        className={styles.img}
        src={images[0].src}
        alt={images[0].alt}
        style={{ objectPosition: images[0].position }}
      />

      <div className={styles.info}>
        <h2 className={styles.name}>{ambassador.name}</h2>
        <h3 className={styles.species}>{ambassador.species}</h3>
      </div>
    </div>
  )
}
