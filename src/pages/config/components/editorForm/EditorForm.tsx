import styles from './editorForm.module.css';

interface EditorProps{
    name: string
    animalType: string
    scientificName: string
    sex: string
    dateOfBirth: string
    story: string
    conservationMission: string

    editForm: (property: string, value: string)=>void
}
export default function EditorForm(props: EditorProps) {
  return (
      <div className={styles.editForm}>
        <div className={styles.imgEdit}>
            <img src="" alt="img" />
            <input type="file" name="img" id="img" />
        </div>
        <form className={styles.form}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={props.name} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <label htmlFor="species">Species</label>
            <input type="text" name="species" id="species" value={props.animalType} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <label htmlFor="scientificName">Scientific Name</label>
            <input type="text" name="scientificName" id="scientificName" value={props.scientificName} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <div className={styles.horizontalInput}>
                <div className={styles.smallInput}>
                    <label htmlFor="sex">Sex</label>
                    <select name="sex" id="sex" onChange={(e)=>props.editForm(e.target.name, e.target.value)}>
                        <option value="Unknown" selected={props.sex !== "Male" && props.sex !== "Female"}>Unknown</option>
                        <option value="Male" selected={props.sex === "Male"}>Male</option>
                        <option value="Female" selected={props.sex === "Female"}>Female</option>
                    </select>
                </div>
                <div className={styles.smallInput}>
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <input type="date" name="dateofbirth" id="dateofbirth" />
                </div>
            </div>

            <label htmlFor="story">Story</label>
            <textarea name="story" id="story" cols={30} rows={5} value={props.story} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <label htmlFor="conservationMission">Conservation Mission</label>
            <textarea name="conservationMission" id="conservationMission" cols={30} rows={5} value={props.conservationMission} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>
        </form>
      </div>
  )
}
