import styles from './animalEditor.module.css';

import EditorForm from '../editorForm/EditorForm';

export default function AnimalEditor() {
  return (
    <div className={styles.animalEditor}>
      <EditorForm/>
    </div>
  )
}
