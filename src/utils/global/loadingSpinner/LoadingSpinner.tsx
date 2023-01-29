import styles from './loadingSpinner.module.css'

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  )
}
