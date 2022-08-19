import { Link } from 'react-router-dom';

import styles from './confirmModal.module.css'

import deleteIcon from '../../../../assets/buttonIcons/delete.svg'
import cancelIcon from '../../../../assets/buttonIcons/cancel.svg'

export default function confirmModal() {
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <div className={styles.header}>
                <span className={styles.close}>&times;</span>
            </div>
            <div className={styles.main}>
                <h2 className={styles.title}>Confirm Delete</h2>
                <div className={styles.buttons}>
                    <Link to={"/"}>
                        <button className={styles.delete}>
                            <img src={deleteIcon} alt="Trash Can Icon"/> 
                            Delete
                        </button>
                    </Link>
                    <button className={styles.cancel}>
                        <img src={cancelIcon} alt="Undo Icon"/> 
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
