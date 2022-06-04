import styles from './config.module.css'

import AnimalData from '../../../assets/animals.json'
import AnimalButton from '../../panel/components/animalButton/AnimalButton'

export default function Config() {
  return (
    <div className={styles.config}>
      <h1>Manage Your Ambassadors</h1>
      <p>Click an ambassador to edit or delete it.</p>
      <button className={styles.newAmbassadorButton}>+ New Ambassador</button>
      <div className={styles.animalList}>
        {
          AnimalData.map(animal => (
            <AnimalButton
              key={animal.name}
              name={animal.name}
              animalType={animal.animalType}
              img={{
                src: animal.imgSrc,
                altText: animal.imgAltText
              }}
            />
          ))
        }

      </div>
    </div>
  )
}
