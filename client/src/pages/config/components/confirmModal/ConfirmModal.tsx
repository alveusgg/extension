import { useNavigate } from 'react-router-dom';

//styles
import styles from './confirmModal.module.css'

//icons
import deleteIcon from '../../../../assets/buttonIcons/delete.svg'
import cancelIcon from '../../../../assets/buttonIcons/cancel.svg'

//utils
import { server } from '../../../../utils/constants'

interface ConfirmModalProps {
    deleteId: string
    changeOpenConfirmModal: (openConfirmModal: boolean) => void
}
export default function ConfirmModal(props: ConfirmModalProps) {
    let navigate = useNavigate()

    const deleteAnimal = async () =>{
        const response = await fetch(server.url+'/api/animals/' + props.deleteId, {
            method: 'DELETE'
        })
        await response.json().then(() => {
            navigate('/')
        })
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
                        <button className={styles.delete} onClick={()=>{deleteAnimal()}}>
                            <img src={deleteIcon} alt="Trash Can Icon"/> 
                            Delete
                        </button>
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
