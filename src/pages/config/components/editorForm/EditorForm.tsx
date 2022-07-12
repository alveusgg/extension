import styles from './editorForm.module.css';
import {AnimalCardProps} from '../../../../utils/animalCard/AnimalCard';
import { ChangeEvent, useState } from 'react';

interface EditorProps{
    cardData: AnimalCardProps["cardData"]
    changeImg: (event: ChangeEvent<HTMLInputElement>) => void
    editForm: (property: string, value: string)=>void
}
export default function EditorForm(props: EditorProps) {

    //counting the length of the textareas
    const [maxTextAreaLength] = useState(135);
    const [storyLength, setStoryLength] = useState<number>(props.cardData.story.length)
    const [conservationMissionLength, setConservationMissionLength] = useState<number>(props.cardData.conservationMission.length)

    function formatDate(date: Date): string {
        return date.getFullYear() + '-' + 
            (date.getUTCMonth()+1<10 ? '0'+(date.getUTCMonth()+1):(date.getUTCMonth()+1)) + '-' + 
            (date.getUTCDate()<10 ? '0'+(date.getUTCDate()):(date.getUTCDate()))
    }

    return (
      <div className={styles.editForm}>
        <div className={styles.imgEdit}>
            <img src={props.cardData.img.src}  alt={props.cardData.img.altText} />
            <input type="file" name="img" id="img" accept="image/*" onChange={(e)=>{props.changeImg(e)}}/>
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
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date" name="dateOfBirth" id="dateOfBirth" value={formatDate(props.cardData.dateOfBirth)} onChange={(e)=>props.editForm(e.target.name, e.target.value)}/>
                </div>
            </div>

            <label htmlFor="story">Story</label>
            <textarea name="story" id="story" cols={30} rows={5} maxLength={maxTextAreaLength} value={props.cardData.story} onChange={(e)=>{props.editForm(e.target.name, e.target.value); setStoryLength(e.target.textLength)}}/>
            <span className={styles.characterLimit}>{storyLength}/{maxTextAreaLength}</span>

            <label htmlFor="conservationMission">Conservation Mission</label>
            <textarea name="conservationMission" id="conservationMission" maxLength={maxTextAreaLength} cols={30} rows={5} value={props.cardData.conservationMission} onChange={(e)=>{props.editForm(e.target.name, e.target.value); setConservationMissionLength(e.target.textLength)}}/>
            <span className={styles.characterLimit}>{conservationMissionLength}/{maxTextAreaLength}</span>
        </form>
      </div>
    )
}
