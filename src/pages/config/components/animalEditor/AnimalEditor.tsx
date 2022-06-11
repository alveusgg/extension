import styles from './animalEditor.module.css';

import EditorForm from '../editorForm/EditorForm';
import AnimalCard from '../../../../utils/animalCard/AnimalCard';
import AnimalButton from '../../../panel/components/animalButton/AnimalButton';

//icons
import deleteIcon from '../../../../assets/buttonIcons/delete.svg';
import saveIcon from '../../../../assets/buttonIcons/save.svg';
import cancelIcon from '../../../../assets/buttonIcons/cancel.svg';

import { useState } from 'react';

import { Link } from 'react-router-dom';

export default function AnimalEditor() {
  const [animal, setAnimal] = useState({
    name: 'Georgie',
    species: 'African Bullfrog',
    img:{
      src: '/animal-images/georgie.png',
      altText: 'Img',
    },
    scientificName: 'Pyxicephalus adspersus',
    sex: 'Male',
    age: "1",
    birthday: "2020",
    iucnStatus: 'Least Concern with Decreasing Population Trend',
    story: 'Abbott was brought into a rehab center when he was very young. Sadly he became imprinted during the rehab process. He has since been rehomed to Alveus sanctuary.',
    conservationMission: 'Educate about the intelligence of birds and proper rehabilitation of wildlife.'
  })

  function editAnimal(inputProperty: string, inputValue: string): void{
    setAnimal({
      ...animal,
      [inputProperty]: inputValue
    })
  }

  return (
    <>
    <Link to={"/"}>
    <button>Back</button>
    </Link>
    <div className={styles.animalEditor}>
      <div className={styles.editor}>
        <EditorForm
          name={animal.name}
          animalType={animal.species}
          scientificName={animal.scientificName}
          sex={animal.sex}
          dateOfBirth={animal.age}
          story={animal.story}
          conservationMission={animal.conservationMission}

          editForm={(property: string, value: string)=>editAnimal(property, value)}
        />
        <div className={styles.buttons}>
          <button className={styles.delete}>
            <img src={deleteIcon} alt="Delete Icon"/> 
            Delete
          </button>
          <div className={styles.mainButtons}>
            <button className={styles.save}>
              <img src={saveIcon} alt="Save Icon"/> 
              Save
            </button>
            <button className={styles.cancel}>
              <img src={cancelIcon} alt="Cancel Icon"/> 
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <AnimalCard
          img={animal.img}
          name={animal.name}
          species={animal.species}
          scientificName={animal.scientificName}
          sex={animal.sex}
          age={animal.age}
          birthday={new Date(animal.birthday)}
          iucnStatus={animal.iucnStatus}
          story={animal.story}
          conservationMission={animal.conservationMission}
        /> 
        <AnimalButton
          name={animal.name}
          animalType={animal.species}
          img={animal.img}
          expand={() => {}}
        />
      </div>
    </div>
    </>
  )
}
