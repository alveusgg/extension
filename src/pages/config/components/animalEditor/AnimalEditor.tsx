import styles from './animalEditor.module.css';

import EditorForm from '../editorForm/EditorForm';
import AnimalCard from '../../../../utils/animalCard/AnimalCard';
import AnimalButton from '../../../panel/components/animalButton/AnimalButton';

//icons
import deleteIcon from '../../../../assets/buttonIcons/delete.svg';
import saveIcon from '../../../../assets/buttonIcons/save.svg';
import cancelIcon from '../../../../assets/buttonIcons/cancel.svg';

export default function AnimalEditor() {
  return (
    <div className={styles.animalEditor}>
      <div className={styles.editor}>
        <EditorForm/>
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
