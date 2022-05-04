//components
import Animal from "../animal/Animal"
//css
import styles from './animals.module.css'
//data
import AnimalsData from "../../assets/animals.json"

export default function Animals() {
  return (
    <div className={styles.animals}>
      {AnimalsData && AnimalsData.map(animal => (
          <Animal 
            key={animal.name} // every animal will have a unique name
            name={animal.name}
            animalType={animal.animalType}
            imgSrc={animal.imgSrc}  
            imgAltText={animal.imgAltText} 
            expandedInfo={animal.expandedInfo}
          />
      ))}
    </div>
  )
}
