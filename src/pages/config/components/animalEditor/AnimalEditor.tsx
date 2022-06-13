import styles from './animalEditor.module.css';

import EditorForm from '../editorForm/EditorForm';
import AnimalCard, { AnimalCardProps } from '../../../../utils/animalCard/AnimalCard';
import AnimalButton from '../../../../utils/animalButton/AnimalButton';

//icons
import deleteIcon from '../../../../assets/buttonIcons/delete.svg';
import saveIcon from '../../../../assets/buttonIcons/save.svg';
import cancelIcon from '../../../../assets/buttonIcons/cancel.svg';

import { Link } from 'react-router-dom';

interface AnimalEditorProps {
  cardData: AnimalCardProps["cardData"]
  onEditForm: (inputProperty: string, inputValue: string) => void
}
export default function AnimalEditor(props: AnimalEditorProps) {
  return (
    <>
    <Link to={"/"}>
    <button>Back</button>
    </Link>
    <div className={styles.animalEditor}>
      <div className={styles.editor}>
        <EditorForm
          cardData={{
            ...props.cardData,
            dateOfBirth: new Date(props.cardData.dateOfBirth)
          }}
          editForm={(property: string, value: string)=>props.onEditForm(property, value)}
        />
        <div className={styles.buttons}>
          <button className={styles.delete}>
            <img src={deleteIcon} alt="Trash Can Icon"/> 
            Delete
          </button>
          <div className={styles.mainButtons}>
            <button className={styles.save}>
              <img src={saveIcon} alt="Floppy Disc Icon"/> 
              Save
            </button>
            <button className={styles.cancel}>
              <img src={cancelIcon} alt="Undo Icon"/> 
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <AnimalCard
          cardData={{
            ...props.cardData,
            dateOfBirth: new Date(props.cardData.dateOfBirth)
          }}
        /> 
        <AnimalButton
          name={props.cardData.name}
          species={props.cardData.species}
          img={props.cardData.img}
        />
      </div>
    </div>
    </>
  )
}
