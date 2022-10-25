import styles from './loadingOverlay.module.scss';
import LoadingSpinner from '../../../../utils/global/loadingSpinner/LoadingSpinner';

export default function LoadingOverlay() {
    return (
        <div className={styles.overlay}>
            <LoadingSpinner />
        </div>
    )
}