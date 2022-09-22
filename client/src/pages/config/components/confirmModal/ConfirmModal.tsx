import { Link } from 'react-router-dom';

import styles from './confirmModal.module.css'

import deleteIcon from '../../../../assets/buttonIcons/delete.svg'
import cancelIcon from '../../../../assets/buttonIcons/cancel.svg'

interface ConfirmModalProps {
    deleteId: string
    changeOpenConfirmModal: (openConfirmModal: boolean) => void
}
export default function confirmModal(props: ConfirmModalProps) {
    const deleteAnimal = async () =>{
        const response = await fetch('http://localhost:3000/api/animals/' + props.deleteId, {
        method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
    }
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <span className={styles.close} onClick={()=>{props.changeOpenConfirmModal(false)}}>&times;</span>
                </div>
                <div className={styles.main}>
                    <h2 className={styles.title}>Confirm Delete</h2>
                    <div className={styles.buttons}>
                        <Link to={"/"}>
                            <button className={styles.delete} onClick={()=>{deleteAnimal()}}>
                                <img src={deleteIcon} alt="Trash Can Icon"/> 
                                Delete
                            </button>
                        </Link>
                        <button className={styles.cancel} onClick={()=>{props.changeOpenConfirmModal(false)}}>
                            <img src={cancelIcon} alt="Undo Icon"/> 
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
