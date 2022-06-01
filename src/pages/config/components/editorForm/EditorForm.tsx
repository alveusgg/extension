import styles from './editorForm.module.css';

export default function EditorForm() {
  return (
      <div className={styles.editForm}>
        <div>
            <input type="file" name="img" id="img" />
        </div>
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />

            <label htmlFor="species">Species</label>
            <input type="text" name="speices" id="species" />

            <label htmlFor="sci-name">Scientific Name</label>
            <input type="text" name="sci-name" id="sci-name" />

            <label htmlFor="iucn">IUCN Status</label>
            <input type="text" name="iucn" id="iucn" />

            <div>
                <label htmlFor="sex">Sex</label>
                <select name="sex" id="sex">
                    <option value="Unknown">Unknown</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <label htmlFor="dateofbirth">Date of Birth</label>
                <input type="date" name="dateofbirth" id="dateofbirth" />
            </div>
        </form>
      </div>
  )
}
