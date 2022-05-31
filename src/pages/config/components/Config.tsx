import styles from './config.module.css'

import AnimalData from '../../../assets/animals.json'
import AnimalPreview from '../../panel/components/animalPreview/AnimalPreview'

export default function Config() {
  return (
    <div className={styles.config}>
      <h1>Manage Your Ambassadors</h1>
      <p>Click an ambassador to edit or delete it.</p>
      <button className={styles.newAmbassadorButton}>+ New Ambassador</button>
      <div className={styles.animalList}>
        {
          AnimalData.map(animal => (
            <AnimalPreview 
              key={animal.name}
              name={animal.name}
              animalType={animal.animalType}
              imgSrc={animal.imgSrc}
              imgAltText={animal.imgAltText}
            />
          ))
        }

      </div>
    </div>
  )
}
