import styles from './editorForm.module.css';

export default function EditorForm() {
  return (
      <div className={styles.editForm}>
        <div className={styles.imgEdit}>
            <img src="" alt="img" />
            <input type="file" name="img" id="img" />
        </div>
        <form className={styles.form}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />

            <label htmlFor="species">Species</label>
            <input type="text" name="speices" id="species" />

            <label htmlFor="sci-name">Scientific Name</label>
            <input type="text" name="sci-name" id="sci-name" />

            <label htmlFor="iucn">IUCN Status</label>
            <input type="text" name="iucn" id="iucn" />

            <div className={styles.horizontalInput}>
                <div className={styles.smallInput}>
                    <label htmlFor="sex">Sex</label>
                    <select name="sex" id="sex">
                        <option value="Unknown">Unknown</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className={styles.smallInput}>
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <input type="date" name="dateofbirth" id="dateofbirth" />
                </div>
            </div>

            <label htmlFor="story">Story</label>
            <textarea name="story" id="story" cols={30} rows={5}/>

            <label htmlFor="conservationmission">Conservation Mission</label>
            <textarea name="conservationmission" id="conservationmission" cols={30} rows={5}/>
        </form>
      </div>
  )
}
