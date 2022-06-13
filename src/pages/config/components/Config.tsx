import styles from './config.module.css'

import AnimalData from '../../../assets/animals.json'
import AnimalButton from '../../../utils/animalButton/AnimalButton'

import { Link } from 'react-router-dom'
import { AnimalCardProps } from '../../../utils/animalCard/AnimalCard'

interface  ConfigProps {
  handleEditCard: (animal: AnimalCardProps["cardData"]) => void
}
export default function Config(props: ConfigProps) {
  return (
    <div className={styles.config}>
      <h1>Manage Your Ambassadors</h1>
      <p>Click an ambassador to edit or delete it.</p>
      <button className={styles.newAmbassadorButton}>+ New Ambassador</button>
      <div className={styles.animalList}>
        {
          AnimalData.map(animal => (
            <Link to={`/animalEditor`}>
              <AnimalButton
                key={animal.name}
                name={animal.name}
                species={animal.species}
                img={{
                  src: animal.img.src,
                  altText: animal.img.altText
                }}
                
                getCard={() => {props.handleEditCard(
                  {
                    ...animal,
                    dateOfBirth: new Date(animal.dateOfBirth)
                  }
                )}}
              />
            </Link>
          ))
        }

      </div>
    </div>
  )
}
