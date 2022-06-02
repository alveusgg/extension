import styles from './animalEditor.module.css';

import EditorForm from '../editorForm/EditorForm';
import AnimalCard from '../../../../utils/animalCard/AnimalCard';
import AnimalButton from '../../../panel/components/animalButton/AnimalButton';

export default function AnimalEditor() {
  return (
    <div className={styles.animalEditor}>
      <div className={styles.editor}>
        <EditorForm/>
        <div className={styles.buttons}>
          <button className={styles.delete}>Delete</button>
          <div className={styles.mainButtons}>
            <button className={styles.save}>Save</button>
            <button className={styles.cancel}>Cancel</button>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <AnimalCard
          name="Georgie" 
          animalType='African Bullfrog'
          imgSrc=''
          imgAltText=''
          close={() => {}}
        /> 
        <AnimalButton
          name="Georgie"
          animalType='African Bullfrog'
          imgSrc=''
          imgAltText=''
          expand={() => {}}
        />
      </div>
    </div>
  )
}
