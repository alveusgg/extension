import styles from './editorForm.module.css';
import {AnimalCardProps} from '../../../../utils/animalCard/AnimalCard';

interface EditorProps{
    cardData: AnimalCardProps["cardData"]
    editForm: (property: string, value: string)=>void
}
export default function EditorForm(props: EditorProps) {
  return (
      <div className={styles.editForm}>
        <div className={styles.imgEdit}>
            <img src={props.cardData.img.src} alt={props.cardData.img.altText} />
            <input type="file" name="img" id="img" />
        </div>
        <form className={styles.form}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={props.cardData.name} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <label htmlFor="species">Species</label>
            <input type="text" name="species" id="species" value={props.cardData.species} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <label htmlFor="scientificName">Scientific Name</label>
            <input type="text" name="scientificName" id="scientificName" value={props.cardData.scientificName} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <div className={styles.horizontalInput}>
                <div className={styles.smallInput}>
                    <label htmlFor="sex">Sex</label>
                    <select name="sex" id="sex" onChange={(e)=>props.editForm(e.target.name, e.target.value)}>
                        <option value="Unknown" selected={props.cardData.sex !== "Male" && props.cardData.sex !== "Female"}>Unknown</option>
                        <option value="Male" selected={props.cardData.sex === "Male"}>Male</option>
                        <option value="Female" selected={props.cardData.sex === "Female"}>Female</option>
                    </select>
                </div>
                <div className={styles.smallInput}>
                    <label htmlFor="dateofbirth">Date of Birth</label>
                    <input type="date" name="dateofbirth" id="dateofbirth" />
                </div>
            </div>

            <label htmlFor="story">Story</label>
            <textarea name="story" id="story" cols={30} rows={5} value={props.cardData.story} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>

            <label htmlFor="conservationMission">Conservation Mission</label>
            <textarea name="conservationMission" id="conservationMission" cols={30} rows={5} value={props.cardData.conservationMission} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>
        </form>
      </div>
  )
}
